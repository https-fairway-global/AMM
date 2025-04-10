Compact compiler 0.22.0 (Compact language 0.14.0)
Compact is Midnight's dedicated smart contract programming language, designed for building secure, efficient, and adaptable decentralized applications.

Compact compiler translates Compact smart contract code into executable bytecode and proof-generating circuits.

12 March 2025

Compact compiler 0.22.0 (Compact language 0.14.0) release notes
Today we are releasing version 0.22.0 of the Compact compiler. There are no changes to the Compact programming language in this release. compactc version 0.22.0 compiles the same language (Compact 0.14.0) as the previous released compiler version 0.21.0.

This release does contain a number of bug fixes, so you should upgrade to version 0.22.0. The bug fixes are described below.

Summary of Changes
This release includes the following bug fixes:

Fix for an issue in ZK proofs for Uint circuit parameters
Fix for an issue preventing coin insertion into ledger ADTs
Fix for a crash when compiling insert_index_default for MerkleTree
Fix for a crash when compiling insert_default for some Maps
Fix for a crash when type checking incorrect programs
Fix for a rare crash when reading the input file
Bug Fixes
Fix for an issue in ZK proofs for Uint circuit parameters
When a circuit had at least two parameters with Uint types, and those types had sizes in bits that were not a power of two, we emitted incorrect code for the ZK proof. The generated JavaScript code was correct, but the proof server would crash. This is now fixed, the proof server will accept the proof.

Fix for an issue preventing coin insertion into ledger ADTs
Inserting a coin into a ledger List, Map, or Set would fail when executing the generated JavaScript code, with the message Error: expected cell. This was a bug in the Impact VM code that is used to update the ledger state. This is now fixed, the coin insertion will work.

Fix for a crash when compiling insert_index_default for MerkleTree
The ledger ADT operation insert_index_default for MerkleTree would fail to compile with the message Internal compiler error (please report): Exception in vmref-q. This issue is now fixed, the program will compile.

Fix for a crash when compiling insert_default for some Maps
The ledger ADT operation insert_default for Maps would fail to compile when the value type was a ledger ADT type. The compiler fail with the message Internal compiler error (please report): Exception: failed assertion (Ltypescript-Type? type). This issue is now fixed, the program will compile.

Fix for a crash when type checking incorrect programs
In some cases where a ledger ADT type was used but the language required a Compact type, the compiler would fail to compile the code with the message Internal compiler error (please report): Exception in infer-types: no matching clause for input. This issue is now fixed, the compiler will signal a helpful error message.

Fix for a rare crash when reading the input file
In rare cases, when the range syntax (..) for Uint types or for loops occurred at the boundary of a compiler-internal file input buffer, the compiler would fail to compile with the message Internal compiler error (please report): Exception in unget-char: cannot unget #\\.. This issue is now fixed, the program will compile.