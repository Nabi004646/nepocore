# Work out an IPv4 subnet from 192.0.2.143/27

Canonical page: https://nepocore.com/blog/ipv4-cidr-subnet-worked-example/

By Nepocore. Published 2026-10-28; updated 2026-11-04.

Follow the block arithmetic, then handle /31 and /32 using their explicitly different interpretations.

## Quick answer

192.0.2.143/27 belongs to 192.0.2.128/27: 32 total addresses, mask 255.255.255.224, and conventional hosts 192.0.2.129–192.0.2.158. The conventional broadcast is 192.0.2.159. /31 point-to-point links and /32 host routes need different interpretations.

## Read the prefix as a number of network bits

An IPv4 address has 32 bits. A /27 prefix assigns 27 of them to the network portion, leaving five address bits. Five bits provide 2⁵ = 32 addresses in the block. The address you enter can be any member of that block; it does not need to be the network address.

Use 192.0.2.143/27 as a worked example. The final-octet blocks begin at multiples of 32: 0, 32, 64, 96, 128 and so on. Since 143 falls between 128 and 159, the network is 192.0.2.128 and the full range ends at 192.0.2.159.

## Separate full addresses from conventional hosts

For an ordinary broadcast subnet with this prefix, the first address identifies the network and the last is the broadcast address. The conventional host range is therefore 192.0.2.129–192.0.2.158, containing 30 host addresses. The subnet mask is 255.255.255.224 and the wildcard is 0.0.0.31.

The host count is a rule under a particular interpretation, rather than an unconditional formula for every prefix. The calculator labels the interpretation beside the result so a student does not blindly subtract two from every possible block.

| Item | /27 example |
| --- | --- |
| Address bits left | 5 |
| Total addresses | 32 |
| Network | 192.0.2.128 |
| Conventional broadcast | 192.0.2.159 |
| Conventional usable range | 192.0.2.129–192.0.2.158 |

## Handle the small-prefix exceptions explicitly

RFC 3021 describes /31 prefixes for point-to-point links. Under that interpretation both addresses can be used as endpoints, so the calculator reports two hosts and does not assign an ordinary broadcast address. This does not claim that every device or network configuration supports that use.

A /32 describes one address, commonly a host route. Its total and host count are both one under the tool’s interpretation. These cases explain why a universal “addresses minus two” shortcut produces misleading results at the smallest blocks.

## Use the output to understand a configuration

Enter an IPv4 address and prefix, calculate, then compare network, mask and range with the exercise or configuration you are reviewing. For a /24, 32 − 24 leaves eight bits and 256 addresses. For a /27, the block is eight times smaller. Relating the prefix to block size makes it easier to spot a mistyped mask.

The tool performs local arithmetic. It does not send packets, discover devices, change routes or establish that an address is available. An address inside a mathematical host range can still be reserved or already assigned in a real network. Check the actual design, addressing records and equipment documentation before applying a configuration.

## Put it into practice

- [CIDR / subnet calculator](https://nepocore.com/tools/subnet-calculator/)
- [Number base converter](https://nepocore.com/tools/base-converter/)
- [UUID generator](https://nepocore.com/tools/uuid/)

## References and method notes

The references explain underlying formats, APIs or methods; they do not endorse Nepocore. Examples and instructions are original to this guide.

- [IETF RFC 4632: Classless Inter-domain Routing](https://www.rfc-editor.org/rfc/rfc4632.html)
- [IETF RFC 3021: 31-bit point-to-point prefixes](https://www.rfc-editor.org/rfc/rfc3021.html)

Prepared with AI assistance. No specialist, clinical or financial review is claimed. Check important outputs and current recipient requirements.

---

[About Nepocore](https://nepocore.com/about/) · [Editorial and corrections policy](https://nepocore.com/editorial-policy/) · [Privacy and processing details](https://nepocore.com/privacy/)
