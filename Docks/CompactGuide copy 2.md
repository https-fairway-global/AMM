# Compact Language Guide

## Basic Syntax and Structure

### File Structure
```compact
pragma language_version >= 0.14.0;
import CompactStandardLibrary;

// Ledger declarations
export ledger my_ledger: Map<Field, Boolean>;

// Struct definitions
struct MyStruct { ... }

// Circuit definitions
circuit my_circuit(): [] { ... }

// Witness declarations
witness my_witness(): MyStruct;
```

### Data Types
1. **Basic Types**
   - `Field`: Primary numeric type
   - `Boolean`: True/false values
   - `Uint<N>`: Fixed-size unsigned integers (e.g., Uint<32>)
   - `Vector<size, type>`: Fixed-size arrays

2. **Type Conversions**
   ```compact
   const uint_value = field_value as Uint<32>;
   ```

### Structs
```compact
struct VerifiablePresentation {
    id: Field,
    issuer: Field,
    timestamp: Field,
    claims: Vector<4, Field>,
    signature: Vector<2, Field>
}
```

## State Management

### Ledger Operations
```compact
// Declaration
export ledger verifications: Map<Field, Boolean>;

// Operations
verifications.insert(key, value);
const result = verifications.lookup(key);
```

## Privacy and Witness Handling

### Witness Functions
```compact
// Declaration only - implementation provided at runtime
witness create_test_data(): MyStruct;
```

### Disclosure
- Use `disclose()` when making witness data public
- Required for ledger operations
```compact
verifications.insert(disclose(id), disclose(is_valid));
```

## Common Patterns and Solutions

### Field Comparisons
```compact
circuit is_greater_or_equal(a: Field, b: Field): Boolean {
    const a_uint = a as Uint<32>;
    const b_uint = b as Uint<32>;
    return a_uint >= b_uint;
}
```

### Boolean Operations
```compact
const combined = condition1 && condition2;
```

## Gotchas and Important Notes

1. **Type Comparisons**
   - Cannot directly compare Field values
   - Must convert to Uint for numeric comparisons
   - Use explicit type conversions

2. **Privacy**
   - Witness data is private by default
   - Must use `disclose()` for public operations
   - All ledger operations require disclosed values

3. **Compilation**
   - Single module per file when importing
   - Proper type declarations required
   - Privacy rules strictly enforced

## Testing and Deployment

### Test Circuit Example
```compact
export circuit test_verification(): [] {
    const test_data = create_test_data();
    verify_data(test_data);
    
    // Verify results
    const is_valid = verifications.lookup(test_data.id);
}
```

### Compilation Command
```bash
curl -X POST http://localhost:3000/compile-contract \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ContractName",
    "source": "source_code_here"
  }'
```

## Best Practices

1. **Code Organization**
   - Keep related functionality together
   - Use clear naming conventions
   - Comment complex logic

2. **Privacy Management**
   - Only disclose necessary data
   - Keep witness data private when possible
   - Document privacy implications

3. **Testing**
   - Include test circuits
   - Test edge cases
   - Verify privacy constraints

## Example: Complete Contract
```compact
pragma language_version >= 0.14.0;
import CompactStandardLibrary;

export ledger verifications: Map<Field, Boolean>;

struct VerifiablePresentation {
    id: Field,
    issuer: Field,
    timestamp: Field,
    claims: Vector<4, Field>,
    signature: Vector<2, Field>
}

circuit is_greater_or_equal(a: Field, b: Field): Boolean {
    const a_uint = a as Uint<32>;
    const b_uint = b as Uint<32>;
    return a_uint >= b_uint;
}

export circuit verify_vp(vp: VerifiablePresentation, required_age: Field): [] {
    const age_valid = disclose(is_greater_or_equal(vp.claims[0], required_age));
    verifications.insert(disclose(vp.id), age_valid);
}

witness create_test_vp(): VerifiablePresentation;

export circuit test_verification(): [] {
    const test_vp = create_test_vp();
    verify_vp(test_vp, 18);
}
``` 