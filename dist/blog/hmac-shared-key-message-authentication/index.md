# Generate and verify an HMAC with the right bytes

Canonical page: https://nepocore.com/blog/hmac-shared-key-message-authentication/

By Nepocore. Published 2026-10-28; updated 2026-11-04.

Distinguish authentication from encryption and compare UTF-8 keys, hexadecimal bytes and exact message content.

## Quick answer

HMAC authenticates message bytes using a shared secret; it does not encrypt them. Match the algorithm, key encoding and exact message bytes when comparing results. Use demonstration keys for learning and keep production credentials out of examples.

## Know what an HMAC can establish

HMAC combines a shared secret key with message bytes and a hash algorithm to produce an authentication code. A party with the same key can recompute or verify the code. It does not hide the message. It also does not provide the public verification or identity model of a public-key digital signature.

Use the tool for learning and controlled debugging. The displayed demo key is public and provides no secrecy. Do not paste a production credential into a tool merely because it runs locally; decide whether using that credential in a browser fits your organization’s handling rules.

## Text and hex can represent different keys

With UTF-8 text encoding, the key string 6162 becomes four ASCII bytes: 36 31 36 32 in hexadecimal. With hexadecimal-byte encoding, 6162 becomes two bytes, 61 62, which represent the letters a and b in ASCII. The characters look identical in the input field, but the key material differs.

Hexadecimal input needs complete byte pairs. A single digit or a non-hex character is rejected. Choose the encoding specified by the system you are comparing against, and distinguish a key’s encoded representation from the secret bytes it represents.

## Make the message exactly reproducible

A trailing newline, different line ending or extra space changes the message bytes and therefore the HMAC. A visually similar Unicode string can also have a different byte representation. When comparing with another implementation, use a simple known test message first and specify the algorithm and encoding.

1. Choose HMAC SHA-256 or SHA-512 to match the reference.
2. Select UTF-8 text or hexadecimal key bytes.
3. Enter the exact message, including intended whitespace.
4. Generate the hexadecimal result.
5. Paste an expected digest into the comparison field to verify it.

SHA-256 output is 32 bytes, represented by 64 hexadecimal characters. SHA-512 output is 64 bytes, represented by 128 characters. The tool validates the expected hex length and uses the browser’s native HMAC verification operation.

## Interpret a mismatch methodically

First compare algorithm, key bytes and message bytes. Then check the reference output encoding: hexadecimal, Base64 and raw bytes are different representations. Do not remove punctuation or normalize whitespace just to force a match unless the protocol explicitly requires that transformation.

HMAC is not a password-storage scheme or a malware test. A matching code proves only the relevant shared-key relationship under the assumptions of the protocol and key handling. The tool does not save the key or send the message to a processing server, but browser fields and downloaded results still deserve appropriate handling. Close the page when finished and avoid including real keys in screenshots or bug reports.

## Put it into practice

- [HMAC generator / verifier](https://nepocore.com/tools/hmac-generator/)
- [SHA hash generator](https://nepocore.com/tools/hash/)
- [All-in-one text formatter](https://nepocore.com/tools/text-formatter/)

## References and method notes

The references explain underlying formats, APIs or methods; they do not endorse Nepocore. Examples and instructions are original to this guide.

- [MDN: SubtleCrypto signing and HMAC](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign)
- [MDN: cryptographic digests](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest)

Prepared with AI assistance. No specialist, clinical or financial review is claimed. Check important outputs and current recipient requirements.

---

[About Nepocore](https://nepocore.com/about/) · [Editorial and corrections policy](https://nepocore.com/editorial-policy/) · [Privacy and processing details](https://nepocore.com/privacy/)
