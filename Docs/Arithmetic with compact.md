Performing Arithmetic in Midnight’s Compact Language with Uint<128>
Uint<128> and Numeric Types in Compact
In Midnight’s Compact smart contract language, Uint<128> denotes an unsigned 128-bit integer type ranging from 0 up to 2^128−1​
DOCS.MIDNIGHT.NETWORK
. Compact is strongly typed, so arithmetic operations must account for operand types. Compact supports two main numeric types: Field (elements of the ZK proving system’s prime field) and Uint (bounded unsigned integers)​
DOCS.MIDNIGHT.NETWORK
. The behavior of arithmetic differs between these types. Notably, Field arithmetic wraps around modulus (overflow/underflow results are reduced mod k, where k is one more than the max field value)​
DOCS.MIDNIGHT.NETWORK
. In contrast, Uint arithmetic never silently wraps – addition or multiplication on Uint produces a result type large enough to hold the exact result without overflow​
DOCS.MIDNIGHT.NETWORK
. For example, adding two Uint values yields a result type covering the sum’s full range, and multiplying yields a type covering the full product range​
DOCS.MIDNIGHT.NETWORK
.
Sized Uint Types and Ranges
A type like Uint<128> is a convenient shorthand for a bounded range Uint<0..(2^128-1)>​
DOCS.MIDNIGHT.NETWORK
. (Currently, Uint lower bounds must be 0, so a Uint type is effectively [0, max].) If you use sized integer types (e.g. Uint<64> or Uint<128>), the compiler will infer precise bounds for results of operations. For instance, given a: Uint<0..m> and b: Uint<0..n>, the expression a + b has type Uint<0..(m+n)>, and a * b has type Uint<0..(m*n)>​
DOCS.MIDNIGHT.NETWORK
. This ensures the result type’s bit-width expands as needed to represent the largest possible sum or product without overflow. Subtraction is similarly safe: a - b yields type Uint<0..m> (the minuend’s range), but at runtime it will error if the result would go negative​
DOCS.MIDNIGHT.NETWORK
. One important constraint: Compact imposes an upper limit on Uint ranges. If an operation’s resulting bound would exceed the maximum representable unsigned integer (as defined by the proving system), the compiler throws a static type error​
DOCS.MIDNIGHT.NETWORK
. In practice, this max is determined by the underlying field size. A numeric literal larger than this limit is invalid as a Uint and must be cast to a Field if it’s below the field’s max value​
DOCS.MIDNIGHT.NETWORK
. Essentially, any Uint type must fit within the field, and any arithmetic result that would require a value beyond the field’s capacity is disallowed at compile time​
DOCS.MIDNIGHT.NETWORK
.
Addition and Subtraction with Uint<128>
Using Uint<128> for addition and subtraction is straightforward, but you should be aware of the type expansion and checks:
Addition: Adding two Uint<128> values (x + y) will produce a result of type Uint<0..(2^128-1 + 2^128-1)> = Uint<0..(2^129-2)>. This type extends beyond 128 bits (it effectively becomes a 129-bit range). If you store the sum in a variable without a type annotation, the compiler infers this enlarged range automatically. However, if you need to assign or cast the sum back to a Uint<128>, you must cast explicitly, and a runtime check will ensure the value fits. For example:
typescript
Copy
let a: Uint<128> = 1000;
let b: Uint<128> = 2500;
let sum_full = a + b;              // type is Uint<0..3500> here (automatically widened)
let sum_128: Uint<128> = (a + b) as Uint<128>;  
// ^ casts result to 128-bit; runtime will throw if sum > 2^128-1
In the above, sum_full would have a type covering 0–3500 (since 1000+2500=3500, well within 128-bit). Casting (a + b) as Uint<128> is allowed because the compiler sees the sum’s max (3500) is below 2^128−1. In general, casting from a larger Uint<0..m> to a smaller Uint<0..n> triggers a checked cast: if m > n, the conversion will fail at runtime if the value exceeds n​
DOCS.MIDNIGHT.NETWORK
. This means you should only downcast when you’re confident the value is in range (or handle the potential failure).
Subtraction: Subtracting two Uint<128> (x - y) yields a result type Uint<0..m> where m is the max of the left operand’s range​
DOCS.MIDNIGHT.NETWORK
. In practice, if x: Uint<128> and y: Uint<128>, the result type stays Uint<128> (since the difference can be at most the left operand’s max). There’s no need for type expansion on subtraction. However, Compact will automatically enforce no underflow: if at runtime y > x, the subtraction triggers a runtime error​
DOCS.MIDNIGHT.NETWORK
. You should ensure (via business logic or explicit checks) that you never subtract a larger number from a smaller one, unless you intentionally want to handle the error. For example, you might do:
typescript
Copy
assert(x >= y, "Underflow check: x must be >= y");
let diff: Uint<128> = x - y;  // safe now, diff is Uint<128>
If x >= y is guaranteed (as in many token balance scenarios), the subtraction will succeed and the result remains a Uint<128> value. No overflow can occur in subtraction since the result cannot exceed the left operand’s max value.
Multiplication and Handling Overflows
Multiplication with Uint<128> requires more care because the product of two 128-bit numbers may require up to 256 bits to represent. According to Compact’s rules, x * y where x,y: Uint<0..n> yields type Uint<0..(n*n)>​
DOCS.MIDNIGHT.NETWORK
. If x and y are full-range 128-bit values (max ~2^128−1 each), the product’s theoretical max is ~2^256–1. This is likely beyond the allowed bound (the limit is tied to the field size, which is typically on the order of 2^252 or 2^253 for Midnight’s proving system). The compiler will flag this as a static error, preventing an overflow at compile time​
DOCS.MIDNIGHT.NETWORK
. How to handle this: If you need to multiply two Uint<128> values, you have a couple of options:
Use a larger integer type (if available): Compact allows larger Uint types up to a certain limit. For example, if the max allowed bit-size is 252 bits, you could cast operands to Uint<252> before multiplying. In code:
typescript
Copy
let prod = (x as Uint<252>) * (y as Uint<252>);
This ensures the result type can hold the full product. However, note that Uint<252> may still be insufficient for two 128-bit maxima (since 256 bits are needed for the absolute worst case). If the compiler still complains, it means even the largest Uint type cannot accommodate the product, so you must use field arithmetic.
Perform the multiplication in the Field: Casting one or both operands to Field will force the multiplication to occur with Field semantics​
DOCS.MIDNIGHT.NETWORK
​
DOCS.MIDNIGHT.NETWORK
. For instance:
typescript
Copy
let k: Field = (x as Field) * (y as Field);
Here x and y are upcast to Field (which is allowed with no runtime cost, since any Uint is a subtype of Field​
DOCS.MIDNIGHT.NETWORK
). The result k is a Field. Because a Field can represent very large numbers modulo its prime, the compiler won’t object to this multiplication. However, be mindful: Field math wraps around modulo p. If x * y exceeds the field’s maximum, it will overflow mod p​
DOCS.MIDNIGHT.NETWORK
, potentially giving an incorrect result for the constant product logic. In practice, to safely use this approach, ensure that the values of x and y are such that their product is below the field modulus (or else the invariant you enforce is “x * y mod p = constant”). Typically, the field is large (on the order of 2^250+), so moderate-size 128-bit values will multiply without wrapping.
Reduce operand size if possible: If the use-case permits smaller ranges (for example, 64-bit values), using Uint<64> for reserves would make the constant product fit in 128 bits (since 2^64–1 multiplied by itself fits in 128 bits). This avoids the need for Field casting entirely. In an AMM context, if 64-bit (or 96-bit, etc.) range covers all realistic token amounts, it’s a simpler solution to prevent overflow at compile-time.
Constant Product Formula (x * y = k) – Implementation Guidance
The constant product formula — x · y = k — is the core invariant of automated market makers like Uniswap. In a Compact contract, you can enforce or utilize this formula with careful attention to types:
Calculating and Storing the Product: You might compute k (the invariant product) from initial reserves. Given x and y as Uint<128>, do not simply do let k = x * y without specifying types, because as discussed, this could infer a type beyond Uint<128>. A safe pattern is to compute k in the field:
typescript
Copy
let k: Field = (x as Field) * (y as Field);
This ensures the multiplication is allowed​
DOCS.MIDNIGHT.NETWORK
. If you want to store k as part of your contract state, you could keep it as a Field or downcast it to a Uint if you know it fits. For example, if you know k will be under 2^128, you can do let k_uint: Uint<128> = k as Uint<128>; (this will check at runtime that k indeed fits in 128 bits)​
DOCS.MIDNIGHT.NETWORK
. Storing k as a Field is also acceptable since any Uint<128> is representable in the field exactly. Using a field for k gives you direct access to multiplication and, importantly, inversion for division (as we’ll see next).
Enforcing the Invariant: To ensure that some operation maintains the constant product, you can assert the equality before and after. For example, in a swap function that updates x and y, you might do:
typescript
Copy
// Before: assume k is stored or calculated as Field
let old_k: Field = (x as Field) * (y as Field);
// ... update x and y (e.g., x = x + dx, y = y - dy) ...
assert((x as Field) * (y as Field) == old_k, "Invariant violated: x*y != k");
By casting the updated x and y to Field and comparing to the stored old_k (also Field), you avoid any type mismatch in the comparison. Both sides of == are Field, so this compiles cleanly. The assertion will fail if the product changed​
DOCS.MIDNIGHT.NETWORK
. Remember that mixing Uint and Field in the same arithmetic expression causes the result to be a Field implicitly​
DOCS.MIDNIGHT.NETWORK
. In our assert, we explicitly cast to make it clear. If old_k were stored as a Uint, you would cast it to Field as well: old_k as Field.
Adjusting Reserves with Constant k: Often, given k and a new x, you compute the required y as y = k / x. Division is not a built-in operator in Compact’s circuit code, but you can achieve it via field arithmetic. Since we’re in a finite field, division can be done by multiplying with the modular inverse. For example:
typescript
Copy
let invX: Field = // compute (new_x)^{-1} mod p, e.g. via Extended Euclidean or pow
let new_y_field: Field = old_k * invX;
let new_y: Uint<128> = new_y_field as Uint<128>; // cast down with runtime check
Here invX is the multiplicative inverse of new_x in the field. You would need to implement or use a library function to get invX (for instance, via Fermat’s little theorem if you know the field modulus). Once you have new_y_field = k / new_x in the field, you cast it to Uint<128> to use as the new reserve. The cast will ensure the result doesn’t exceed 128-bit range at runtime. Important: This approach assumes new_x is not zero (you cannot invert zero) and that k / new_x yields an integer that fits in 128 bits. In an AMM, k and new_x are positive by design, and typically y will decrease, remaining in range.
Avoiding Type Mismatch Pitfalls: Make sure that both operands in critical arithmetic expressions are of the intended type. If you mix a Field and a Uint<128> in an expression, the compiler will treat the operation as field arithmetic​
DOCS.MIDNIGHT.NETWORK
. This can be intentional (as in our casts above) but can also happen unintentionally if, say, one operand is a literal that exceeded the Uint max and got defaulted to Field. Always explicitly cast your operands to the desired type to be clear. For example, if k is a Field but x is a Uint, writing k * x will implicitly cast x to Field (since k is Field) and perform a field multiplication. The result is a Field, which might then need casting if you assign to a Uint. Keeping track of these conversions is important for correctness. In summary: if you want modular arithmetic, ensure a field is involved; if you want bounded integer arithmetic, keep both values as Uint types.
Example: Swap Function Snippet
Putting it together, here is a simplified example of adjusting an AMM pool while maintaining the invariant:
typescript
Copy
export circuit swap(delta_x: Uint<128>): Void {
    // Assume ledger reserves: reserve_x: Uint<128>, reserve_y: Uint<128>
    let x_old = ledger.reserve_x;
    let y_old = ledger.reserve_y;
    let k: Field = (x_old as Field) * (y_old as Field);          // compute invariant
    
    // Increase x by delta_x (add liquidity or incoming swap amount)
    let x_new: Uint<0..(2^128-1 + 2^128-1)> = x_old + delta_x;    // type expanded for sum
    assert(x_new as Uint<128>, "Overflow: x_new out of 128-bit range"); 
    // ^ Cast with check (will error if x_new > 2^128-1)
    
    // Compute new y = k / x_new (using field inverse for division)
    let inv_x_new: Field = /* compute modular inverse of (x_new as Field) */;
    let y_new_field: Field = k * inv_x_new;
    let y_new: Uint<128> = y_new_field as Uint<128>;             // downcast with runtime check
    
    // Update the ledger state
    ledger.reserve_x = x_new as Uint<128>;   // safe because we asserted it fits
    ledger.reserve_y = y_new;
}
In this snippet, reserve_x and reserve_y are the pool reserves stored on the ledger (128-bit each). We calculate k as a Field to allow the multiplication. After increasing x, we ensure x_new didn’t overflow 128-bit (the cast as Uint<128> would runtime-check this). Then we find y_new by dividing k by x_new in the field. Finally, we cast results back to Uint<128> for storing. This pattern handles type conversions explicitly and guards against overflow or underflow at each step.
Key Takeaways and Best Practices
Use Uint types for values where you want to avoid modular wraparound. Uint<128> ensures no silent overflow – the type system will force you to handle any potential overflow case at compile time​
DOCS.MIDNIGHT.NETWORK
​
DOCS.MIDNIGHT.NETWORK
.
If a multiplication of two Uint<128> is too large to represent, cast to Field to leverage the larger range of the prime field​
DOCS.MIDNIGHT.NETWORK
. Just be cautious of field overflow (modulo) – ensure it won’t occur for your expected input sizes or that it’s acceptable for your logic.
Casting (as) is explicit and required when going between Uint<128> and Field. Casting a smaller Uint up to Field is a no-op (always safe)​
DOCS.MIDNIGHT.NETWORK
, while casting down from Field to Uint or from a larger Uint to a smaller Uint performs a checked conversion at runtime​
DOCS.MIDNIGHT.NETWORK
. Handle or avoid scenarios where this check might fail (e.g. add proper asserts or limit inputs).
When implementing formulas like x · y = k, it’s often easiest to do calculations in the field (for flexibility with multiplication and potential division) but to store or enforce final results in Uint form if you want absolute guarantee of no wraparound. Invariants can be checked with field arithmetic and then cast results back to Uint for storage or further use.
Finally, follow Compact’s syntax nuances: use expr as Type for casting (TypeScript-style <Type>expr casts are not supported)​
DOCS.MIDNIGHT.NETWORK
. Ensure both operands of +, -, * are of compatible types to get the intended semantics (either both Uint or at least one Field)​
DOCS.MIDNIGHT.NETWORK
. By adhering to these patterns, you can safely implement arithmetic-heavy logic like AMM constant products in Compact.
Sources: The behavior of arithmetic and casting in Compact is documented in Midnight’s official docs​
DOCS.MIDNIGHT.NETWORK
​
DOCS.MIDNIGHT.NETWORK
​
DOCS.MIDNIGHT.NETWORK
. The above examples and guidelines are derived from these specifications to illustrate proper handling of Uint<128> operations and the constant product formula in practice.