# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.1.3](https://github.com/bentatum/tenk/compare/tenk@5.1.2...tenk@5.1.3) (2025-01-11)


### Bug Fixes

* **png:** call setup canvas ([#71](https://github.com/bentatum/tenk/issues/71)) ([d6286eb](https://github.com/bentatum/tenk/commit/d6286eb7c77d3665ec31f2fc6114bfcf19c46878))





## [5.1.2](https://github.com/bentatum/tenk/compare/tenk@5.1.1...tenk@5.1.2) (2023-05-10)


### Bug Fixes

* dont require group element ([#70](https://github.com/bentatum/tenk/issues/70)) ([aa83050](https://github.com/bentatum/tenk/commit/aa83050a6a674d0a0cd39e107083cd96dfff661f))





## [5.1.1](https://github.com/bentatum/tenk/compare/tenk@5.1.0...tenk@5.1.1) (2023-03-01)


### Bug Fixes

* undefined format breaks builds ([#69](https://github.com/bentatum/tenk/issues/69)) ([99ecbb9](https://github.com/bentatum/tenk/commit/99ecbb904bc4c9de60b393c37ec9987c75846cf1))





# [5.1.0](https://github.com/bentatum/tenk/compare/tenk@5.0.0...tenk@5.1.0) (2023-01-16)


### Features

* layer display name ([#68](https://github.com/bentatum/tenk/issues/68)) ([3ea593a](https://github.com/bentatum/tenk/commit/3ea593a48ee477065b4973bcb061002b6ff34e07)), closes [Footwear#50](https://github.com/Footwear/issues/50) [Shoes#50](https://github.com/Shoes/issues/50) [Boots#50](https://github.com/Boots/issues/50)





# [5.0.0](https://github.com/bentatum/tenk/compare/tenk@4.1.0...tenk@5.0.0) (2023-01-10)


* feat!: leave no svg file when only png is defined in formats (#67) ([f970365](https://github.com/bentatum/tenk/commit/f970365b83d1f1ca2fcf48e9b8a1e16b4251bdfe)), closes [#67](https://github.com/bentatum/tenk/issues/67)


### BREAKING CHANGES

* output is only png files and json files when formats is defined as png
output should be as expected when using the following commands:

tenk -f svg
.tenk/
  0.json
  0.svg
  1.json
  1.svg
  ...

tenk -f png
.tenk/
  0.json
  0.png
  1.json
  1.png
  ...

tenk -f svg,png
.tenk/
  0.json
  0.png
  0.svg
  1.json
  1.png
  1.svg





# [4.1.0](https://github.com/bentatum/tenk/compare/tenk@4.0.0...tenk@4.1.0) (2023-01-09)


### Bug Fixes

* revert cli engine dependency to latest dist tag ([#66](https://github.com/bentatum/tenk/issues/66)) ([395994f](https://github.com/bentatum/tenk/commit/395994f6017ff6422ad2d27d1d29bfe9bdd422c1))


### Features

* disable dna ([#65](https://github.com/bentatum/tenk/issues/65)) ([0408309](https://github.com/bentatum/tenk/commit/04083096e89fbe9705f07d403823dd448fad21f3))





# [4.0.0](https://github.com/bentatum/tenk/compare/tenk@3.0.0...tenk@4.0.0) (2023-01-03)


* feat!: change output format to work with solana (#64) ([597697b](https://github.com/bentatum/tenk/commit/597697bd7965f9def190d4c9e2dca7c7330afc91)), closes [#64](https://github.com/bentatum/tenk/issues/64)


### BREAKING CHANGES

* changed file output format
`tenk.config.json` file now supports `name`, `symbol`, `description` and `image`

You can leverage the modifyMetadata function to adhere to Solana standards:
```
modifyMetadata(tokenId, attributes, tokenLayers, dna) {
  return {
    name: String(tokenId),
    description: "10k collection of Tenk the Tank",
    symbol: "TENK",
    attributes,
    image: `${tokenId}.png`,
    properties: {
      category: "image",
      files: [
        {
          uri: `${tokenId}.svg`,
          type: "image/svg+xml",
        },
        {
          uri: `${tokenId}.png`,
          type: "image/png",
        },
      ],
    },
  };
}
```





# [3.0.0](https://github.com/bentatum/tenk/compare/tenk@2.0.0...tenk@3.0.0) (2023-01-01)


* feat!: layer attribute option (#62) ([e27038f](https://github.com/bentatum/tenk/commit/e27038fe649c9850f654ea534da4f769bc65f24e)), closes [#62](https://github.com/bentatum/tenk/issues/62)


### BREAKING CHANGES

* modifier renamed to modifyLayers
Added modifyMetadata option
Updated engine docs





# [2.0.0](https://github.com/bentatum/tenk/compare/tenk@0.1.3...tenk@2.0.0) (2022-12-30)



## 0.13.1 (2022-12-30)



# 0.13.0 (2022-12-24)


### Features

* make element weight definable via filename ([#59](https://github.com/bentatum/tenk/issues/59)) ([1b0f99b](https://github.com/bentatum/tenk/commit/1b0f99b80ed72b250c2c4c410adc7926b2231749))



# 0.12.0 (2022-12-17)


* feat!: config key dot notation (#56) ([3f589b2](https://github.com/bentatum/tenk/commit/3f589b2ff57e406a3dcc375c84a08ef018eab307)), closes [#56](https://github.com/bentatum/tenk/issues/56)


### BREAKING CHANGES

* rules config are no longer case insensitive



# 0.11.0 (2022-12-14)


### Features

* **sub-layers:** tests ([#55](https://github.com/bentatum/tenk/issues/55)) ([1cdb240](https://github.com/bentatum/tenk/commit/1cdb24046675607d2d04294a75640d7e966deed7))



# 0.10.0 (2022-12-13)


### Features

* make elements configurable ([#54](https://github.com/bentatum/tenk/issues/54)) ([d43ab83](https://github.com/bentatum/tenk/commit/d43ab8305e96ba92d7377d9aaa5b407b33652dd6))



# 0.9.0 (2022-12-12)


### Features

* verbose mode ([#53](https://github.com/bentatum/tenk/issues/53)) ([42c5af3](https://github.com/bentatum/tenk/commit/42c5af3f199f098e7b1c09365c85f3d06951faed))



## 0.8.1 (2022-12-12)


### Bug Fixes

* properly inject config ([#52](https://github.com/bentatum/tenk/issues/52)) ([f999014](https://github.com/bentatum/tenk/commit/f99901410bb23c656c7e9b4f936444f9f1a2f765))



# 0.8.0 (2022-12-11)


* feat!: use standard cli argument format (#51) ([91caef6](https://github.com/bentatum/tenk/commit/91caef69d09185292e59087fa7cba3410c8f9a75)), closes [#51](https://github.com/bentatum/tenk/issues/51)


### BREAKING CHANGES

* using standard arg flags instead of implicit indexed args



# 0.7.0 (2022-12-10)



## 0.6.1 (2022-12-10)



# 0.6.0 (2022-10-18)


### Features

* formats argument ([#47](https://github.com/bentatum/tenk/issues/47)) ([d5d9659](https://github.com/bentatum/tenk/commit/d5d9659f27fd8408944d78bdfe3334831404759d))



# 0.5.0 (2022-10-18)


### Features

* support png projects ([#46](https://github.com/bentatum/tenk/issues/46)) ([0120276](https://github.com/bentatum/tenk/commit/0120276ad4e56be613a691534a8b26835b96ee1b))



## 0.4.9 (2022-10-18)



## 0.4.8 (2022-10-17)



## 0.4.7 (2022-10-17)



## 0.4.6 (2022-10-16)



## 0.4.5 (2022-10-16)



## 0.4.4 (2022-10-16)



## 0.4.3 (2022-10-16)



## 0.4.2 (2022-10-16)



## 0.4.1 (2022-10-16)


### Bug Fixes

* process exit if metadata is empty ([#35](https://github.com/bentatum/tenk/issues/35)) ([cfd9aa9](https://github.com/bentatum/tenk/commit/cfd9aa9dd9dbe9d3c695d3a60d0133b774d15af6))



# 0.4.0 (2022-10-15)


### Features

* better error handling when layers directory is missing ([#34](https://github.com/bentatum/tenk/issues/34)) ([0970a77](https://github.com/bentatum/tenk/commit/0970a77a703d519d880087977e934346d1c03001))



## 0.3.4 (2022-10-15)



## 0.3.3 (2022-10-15)



## 0.3.1 (2022-10-14)



# 0.3.0 (2022-10-14)


### Bug Fixes

* cli yarn lock ([#17](https://github.com/bentatum/tenk/issues/17)) ([8d2eb2d](https://github.com/bentatum/tenk/commit/8d2eb2dcb4af53ffb61410f0473401a0a908661a))
* version ([#18](https://github.com/bentatum/tenk/issues/18)) ([0ac3efd](https://github.com/bentatum/tenk/commit/0ac3efde848900a5732370d3cbd735182c4d0a6d))
* version ([#25](https://github.com/bentatum/tenk/issues/25)) ([d976bdf](https://github.com/bentatum/tenk/commit/d976bdf2567677ece470a412d9c8da18ee92d19b))
* version ([#26](https://github.com/bentatum/tenk/issues/26)) ([18da797](https://github.com/bentatum/tenk/commit/18da79749eba68447d4ca2637a16b8ced58ae5ab))
* version ([#27](https://github.com/bentatum/tenk/issues/27)) ([e9387f1](https://github.com/bentatum/tenk/commit/e9387f144f472d01b0c0309e83f0761a7c2cc664))
* version ([#28](https://github.com/bentatum/tenk/issues/28)) ([f3377eb](https://github.com/bentatum/tenk/commit/f3377ebce1aafd57d6ce3fd865288806ed394ccd))


### Features

* ci publishing ([#21](https://github.com/bentatum/tenk/issues/21)) ([c789b22](https://github.com/bentatum/tenk/commit/c789b22c031176a304e36dc608744b7ab1b22fad))
* ci publishing ([#22](https://github.com/bentatum/tenk/issues/22)) ([3efc960](https://github.com/bentatum/tenk/commit/3efc960ec46ed9c7b2bbc01e50778f24c16279bb))
* ci publishing ([#23](https://github.com/bentatum/tenk/issues/23)) ([8d142b0](https://github.com/bentatum/tenk/commit/8d142b0a01964c7aa0bcb9db2c72ebdb6a5a7ff2))
* ci publishing ([#24](https://github.com/bentatum/tenk/issues/24)) ([c37e901](https://github.com/bentatum/tenk/commit/c37e901e393f9264ddd7c285aeea8af6dd19bd7e))





## [0.13.1](https://github.com/bentatum/tenk/compare/v0.13.0...v0.13.1) (2022-12-30)

**Note:** Version bump only for package tenk





# [0.13.0](https://github.com/bentatum/tenk/compare/v0.12.1...v0.13.0) (2022-12-24)


### Features

* make element weight definable via filename ([#59](https://github.com/bentatum/tenk/issues/59)) ([1b0f99b](https://github.com/bentatum/tenk/commit/1b0f99b80ed72b250c2c4c410adc7926b2231749))





# [0.12.0](https://github.com/bentatum/tenk/compare/v0.11.0...v0.12.0) (2022-12-17)


* feat!: config key dot notation (#56) ([3f589b2](https://github.com/bentatum/tenk/commit/3f589b2ff57e406a3dcc375c84a08ef018eab307)), closes [#56](https://github.com/bentatum/tenk/issues/56)


### BREAKING CHANGES

* rules config are no longer case insensitive





# [0.11.0](https://github.com/bentatum/tenk/compare/v0.10.0...v0.11.0) (2022-12-14)


### Features

* **sub-layers:** tests ([#55](https://github.com/bentatum/tenk/issues/55)) ([1cdb240](https://github.com/bentatum/tenk/commit/1cdb24046675607d2d04294a75640d7e966deed7))





# [0.10.0](https://github.com/bentatum/tenk/compare/v0.9.0...v0.10.0) (2022-12-13)


### Features

* make elements configurable ([#54](https://github.com/bentatum/tenk/issues/54)) ([d43ab83](https://github.com/bentatum/tenk/commit/d43ab8305e96ba92d7377d9aaa5b407b33652dd6))





# [0.9.0](https://github.com/bentatum/tenk/compare/v0.8.1...v0.9.0) (2022-12-12)


### Features

* verbose mode ([#53](https://github.com/bentatum/tenk/issues/53)) ([42c5af3](https://github.com/bentatum/tenk/commit/42c5af3f199f098e7b1c09365c85f3d06951faed))





## [0.8.1](https://github.com/bentatum/tenk/compare/v0.8.0...v0.8.1) (2022-12-12)


### Bug Fixes

* properly inject config ([#52](https://github.com/bentatum/tenk/issues/52)) ([f999014](https://github.com/bentatum/tenk/commit/f99901410bb23c656c7e9b4f936444f9f1a2f765))





# [0.8.0](https://github.com/bentatum/tenk/compare/v0.7.0...v0.8.0) (2022-12-11)


* feat!: use standard cli argument format (#51) ([91caef6](https://github.com/bentatum/tenk/commit/91caef69d09185292e59087fa7cba3410c8f9a75)), closes [#51](https://github.com/bentatum/tenk/issues/51)


### BREAKING CHANGES

* using standard arg flags instead of implicit indexed args





# [0.7.0](https://github.com/bentatum/tenk/compare/v0.6.1...v0.7.0) (2022-12-10)

**Note:** Version bump only for package tenk





## [0.6.1](https://github.com/bentatum/tenk/compare/v0.6.0...v0.6.1) (2022-12-10)

**Note:** Version bump only for package tenk





# [0.6.0](https://github.com/bentatum/tenk/compare/v0.5.0...v0.6.0) (2022-10-18)


### Features

* formats argument ([#47](https://github.com/bentatum/tenk/issues/47)) ([d5d9659](https://github.com/bentatum/tenk/commit/d5d9659f27fd8408944d78bdfe3334831404759d))





# [0.5.0](https://github.com/bentatum/tenk/compare/v0.4.9...v0.5.0) (2022-10-18)


### Features

* support png projects ([#46](https://github.com/bentatum/tenk/issues/46)) ([0120276](https://github.com/bentatum/tenk/commit/0120276ad4e56be613a691534a8b26835b96ee1b))





## [0.4.9](https://github.com/bentatum/tenk/compare/v0.4.8...v0.4.9) (2022-10-18)

**Note:** Version bump only for package tenk





## [0.4.8](https://github.com/bentatum/tenk/compare/v0.4.7...v0.4.8) (2022-10-17)

**Note:** Version bump only for package tenk





## [0.4.7](https://github.com/bentatum/tenk/compare/v0.4.6...v0.4.7) (2022-10-17)

**Note:** Version bump only for package tenk





## [0.4.6](https://github.com/bentatum/tenk/compare/v0.4.5...v0.4.6) (2022-10-16)

**Note:** Version bump only for package tenk





## [0.4.5](https://github.com/bentatum/tenk/compare/v0.4.4...v0.4.5) (2022-10-16)

**Note:** Version bump only for package tenk





## [0.4.4](https://github.com/bentatum/tenk/compare/v0.4.3...v0.4.4) (2022-10-16)

**Note:** Version bump only for package tenk





## [0.4.3](https://github.com/bentatum/tenk/compare/v0.4.2...v0.4.3) (2022-10-16)

**Note:** Version bump only for package tenk





## [0.4.2](https://github.com/bentatum/tenk/compare/v0.4.1...v0.4.2) (2022-10-16)

**Note:** Version bump only for package tenk





## [0.4.1](https://github.com/bentatum/tenk/compare/v0.4.0...v0.4.1) (2022-10-16)


### Bug Fixes

* process exit if metadata is empty ([#35](https://github.com/bentatum/tenk/issues/35)) ([cfd9aa9](https://github.com/bentatum/tenk/commit/cfd9aa9dd9dbe9d3c695d3a60d0133b774d15af6))





# [0.4.0](https://github.com/bentatum/tenk/compare/v0.3.4...v0.4.0) (2022-10-15)


### Features

* better error handling when layers directory is missing ([#34](https://github.com/bentatum/tenk/issues/34)) ([0970a77](https://github.com/bentatum/tenk/commit/0970a77a703d519d880087977e934346d1c03001))





## [0.3.4](https://github.com/bentatum/tenk/compare/v0.3.3...v0.3.4) (2022-10-15)

**Note:** Version bump only for package tenk





## [0.3.3](https://github.com/bentatum/tenk/compare/v0.3.2...v0.3.3) (2022-10-15)

**Note:** Version bump only for package tenk





## [0.3.1](https://github.com/bentatum/tenk/compare/v0.3.0...v0.3.1) (2022-10-14)

**Note:** Version bump only for package tenk





# 0.3.0 (2022-10-14)


### Bug Fixes

* cli engine package version ([#3](https://github.com/bentatum/tenk/issues/3)) ([aee6c35](https://github.com/bentatum/tenk/commit/aee6c356b3bdbae6cb013d48c6fedbd5bf43a858))
* cli yarn lock ([#13](https://github.com/bentatum/tenk/issues/13)) ([bc888e0](https://github.com/bentatum/tenk/commit/bc888e058f5dce2e436d1ce4b4360bd253343423))
* cli yarn lock ([#17](https://github.com/bentatum/tenk/issues/17)) ([8d2eb2d](https://github.com/bentatum/tenk/commit/8d2eb2dcb4af53ffb61410f0473401a0a908661a))
* outdated lock file in cli package ([#10](https://github.com/bentatum/tenk/issues/10)) ([d2187b8](https://github.com/bentatum/tenk/commit/d2187b81a407fde48a23ea284b5aca657087946f))
* version ([#18](https://github.com/bentatum/tenk/issues/18)) ([0ac3efd](https://github.com/bentatum/tenk/commit/0ac3efde848900a5732370d3cbd735182c4d0a6d))
* version ([#25](https://github.com/bentatum/tenk/issues/25)) ([d976bdf](https://github.com/bentatum/tenk/commit/d976bdf2567677ece470a412d9c8da18ee92d19b))
* version ([#26](https://github.com/bentatum/tenk/issues/26)) ([18da797](https://github.com/bentatum/tenk/commit/18da79749eba68447d4ca2637a16b8ced58ae5ab))
* version ([#27](https://github.com/bentatum/tenk/issues/27)) ([e9387f1](https://github.com/bentatum/tenk/commit/e9387f144f472d01b0c0309e83f0761a7c2cc664))
* version ([#28](https://github.com/bentatum/tenk/issues/28)) ([f3377eb](https://github.com/bentatum/tenk/commit/f3377ebce1aafd57d6ce3fd865288806ed394ccd))


### Features

* ci publishing ([#21](https://github.com/bentatum/tenk/issues/21)) ([c789b22](https://github.com/bentatum/tenk/commit/c789b22c031176a304e36dc608744b7ab1b22fad))
* ci publishing ([#22](https://github.com/bentatum/tenk/issues/22)) ([3efc960](https://github.com/bentatum/tenk/commit/3efc960ec46ed9c7b2bbc01e50778f24c16279bb))
* ci publishing ([#23](https://github.com/bentatum/tenk/issues/23)) ([8d142b0](https://github.com/bentatum/tenk/commit/8d142b0a01964c7aa0bcb9db2c72ebdb6a5a7ff2))
* ci publishing ([#24](https://github.com/bentatum/tenk/issues/24)) ([c37e901](https://github.com/bentatum/tenk/commit/c37e901e393f9264ddd7c285aeea8af6dd19bd7e))





# 0.3.0 (2022-10-14)


### Bug Fixes

* cli engine package version ([#3](https://github.com/bentatum/tenk/issues/3)) ([aee6c35](https://github.com/bentatum/tenk/commit/aee6c356b3bdbae6cb013d48c6fedbd5bf43a858))
* cli yarn lock ([#13](https://github.com/bentatum/tenk/issues/13)) ([bc888e0](https://github.com/bentatum/tenk/commit/bc888e058f5dce2e436d1ce4b4360bd253343423))
* cli yarn lock ([#17](https://github.com/bentatum/tenk/issues/17)) ([8d2eb2d](https://github.com/bentatum/tenk/commit/8d2eb2dcb4af53ffb61410f0473401a0a908661a))
* outdated lock file in cli package ([#10](https://github.com/bentatum/tenk/issues/10)) ([d2187b8](https://github.com/bentatum/tenk/commit/d2187b81a407fde48a23ea284b5aca657087946f))
* version ([#18](https://github.com/bentatum/tenk/issues/18)) ([0ac3efd](https://github.com/bentatum/tenk/commit/0ac3efde848900a5732370d3cbd735182c4d0a6d))
* version ([#25](https://github.com/bentatum/tenk/issues/25)) ([d976bdf](https://github.com/bentatum/tenk/commit/d976bdf2567677ece470a412d9c8da18ee92d19b))
* version ([#26](https://github.com/bentatum/tenk/issues/26)) ([18da797](https://github.com/bentatum/tenk/commit/18da79749eba68447d4ca2637a16b8ced58ae5ab))
* version ([#27](https://github.com/bentatum/tenk/issues/27)) ([e9387f1](https://github.com/bentatum/tenk/commit/e9387f144f472d01b0c0309e83f0761a7c2cc664))


### Features

* ci publishing ([#21](https://github.com/bentatum/tenk/issues/21)) ([c789b22](https://github.com/bentatum/tenk/commit/c789b22c031176a304e36dc608744b7ab1b22fad))
* ci publishing ([#22](https://github.com/bentatum/tenk/issues/22)) ([3efc960](https://github.com/bentatum/tenk/commit/3efc960ec46ed9c7b2bbc01e50778f24c16279bb))
* ci publishing ([#23](https://github.com/bentatum/tenk/issues/23)) ([8d142b0](https://github.com/bentatum/tenk/commit/8d142b0a01964c7aa0bcb9db2c72ebdb6a5a7ff2))
* ci publishing ([#24](https://github.com/bentatum/tenk/issues/24)) ([c37e901](https://github.com/bentatum/tenk/commit/c37e901e393f9264ddd7c285aeea8af6dd19bd7e))





# 0.3.0 (2022-10-14)


### Bug Fixes

* cli engine package version ([#3](https://github.com/bentatum/tenk/issues/3)) ([aee6c35](https://github.com/bentatum/tenk/commit/aee6c356b3bdbae6cb013d48c6fedbd5bf43a858))
* cli yarn lock ([#13](https://github.com/bentatum/tenk/issues/13)) ([bc888e0](https://github.com/bentatum/tenk/commit/bc888e058f5dce2e436d1ce4b4360bd253343423))
* cli yarn lock ([#17](https://github.com/bentatum/tenk/issues/17)) ([8d2eb2d](https://github.com/bentatum/tenk/commit/8d2eb2dcb4af53ffb61410f0473401a0a908661a))
* outdated lock file in cli package ([#10](https://github.com/bentatum/tenk/issues/10)) ([d2187b8](https://github.com/bentatum/tenk/commit/d2187b81a407fde48a23ea284b5aca657087946f))
* version ([#18](https://github.com/bentatum/tenk/issues/18)) ([0ac3efd](https://github.com/bentatum/tenk/commit/0ac3efde848900a5732370d3cbd735182c4d0a6d))
* version ([#25](https://github.com/bentatum/tenk/issues/25)) ([d976bdf](https://github.com/bentatum/tenk/commit/d976bdf2567677ece470a412d9c8da18ee92d19b))
* version ([#26](https://github.com/bentatum/tenk/issues/26)) ([18da797](https://github.com/bentatum/tenk/commit/18da79749eba68447d4ca2637a16b8ced58ae5ab))


### Features

* ci publishing ([#21](https://github.com/bentatum/tenk/issues/21)) ([c789b22](https://github.com/bentatum/tenk/commit/c789b22c031176a304e36dc608744b7ab1b22fad))
* ci publishing ([#22](https://github.com/bentatum/tenk/issues/22)) ([3efc960](https://github.com/bentatum/tenk/commit/3efc960ec46ed9c7b2bbc01e50778f24c16279bb))
* ci publishing ([#23](https://github.com/bentatum/tenk/issues/23)) ([8d142b0](https://github.com/bentatum/tenk/commit/8d142b0a01964c7aa0bcb9db2c72ebdb6a5a7ff2))
* ci publishing ([#24](https://github.com/bentatum/tenk/issues/24)) ([c37e901](https://github.com/bentatum/tenk/commit/c37e901e393f9264ddd7c285aeea8af6dd19bd7e))





# 0.3.0 (2022-10-14)


### Bug Fixes

* cli engine package version ([#3](https://github.com/bentatum/tenk/issues/3)) ([aee6c35](https://github.com/bentatum/tenk/commit/aee6c356b3bdbae6cb013d48c6fedbd5bf43a858))
* cli yarn lock ([#13](https://github.com/bentatum/tenk/issues/13)) ([bc888e0](https://github.com/bentatum/tenk/commit/bc888e058f5dce2e436d1ce4b4360bd253343423))
* cli yarn lock ([#17](https://github.com/bentatum/tenk/issues/17)) ([8d2eb2d](https://github.com/bentatum/tenk/commit/8d2eb2dcb4af53ffb61410f0473401a0a908661a))
* outdated lock file in cli package ([#10](https://github.com/bentatum/tenk/issues/10)) ([d2187b8](https://github.com/bentatum/tenk/commit/d2187b81a407fde48a23ea284b5aca657087946f))
* version ([#18](https://github.com/bentatum/tenk/issues/18)) ([0ac3efd](https://github.com/bentatum/tenk/commit/0ac3efde848900a5732370d3cbd735182c4d0a6d))
* version ([#25](https://github.com/bentatum/tenk/issues/25)) ([d976bdf](https://github.com/bentatum/tenk/commit/d976bdf2567677ece470a412d9c8da18ee92d19b))


### Features

* ci publishing ([#21](https://github.com/bentatum/tenk/issues/21)) ([c789b22](https://github.com/bentatum/tenk/commit/c789b22c031176a304e36dc608744b7ab1b22fad))
* ci publishing ([#22](https://github.com/bentatum/tenk/issues/22)) ([3efc960](https://github.com/bentatum/tenk/commit/3efc960ec46ed9c7b2bbc01e50778f24c16279bb))
* ci publishing ([#23](https://github.com/bentatum/tenk/issues/23)) ([8d142b0](https://github.com/bentatum/tenk/commit/8d142b0a01964c7aa0bcb9db2c72ebdb6a5a7ff2))
* ci publishing ([#24](https://github.com/bentatum/tenk/issues/24)) ([c37e901](https://github.com/bentatum/tenk/commit/c37e901e393f9264ddd7c285aeea8af6dd19bd7e))





# 0.2.0 (2022-10-14)


### Bug Fixes

* cli engine package version ([#3](https://github.com/bentatum/tenk/issues/3)) ([aee6c35](https://github.com/bentatum/tenk/commit/aee6c356b3bdbae6cb013d48c6fedbd5bf43a858))
* cli yarn lock ([#13](https://github.com/bentatum/tenk/issues/13)) ([bc888e0](https://github.com/bentatum/tenk/commit/bc888e058f5dce2e436d1ce4b4360bd253343423))
* cli yarn lock ([#17](https://github.com/bentatum/tenk/issues/17)) ([8d2eb2d](https://github.com/bentatum/tenk/commit/8d2eb2dcb4af53ffb61410f0473401a0a908661a))
* outdated lock file in cli package ([#10](https://github.com/bentatum/tenk/issues/10)) ([d2187b8](https://github.com/bentatum/tenk/commit/d2187b81a407fde48a23ea284b5aca657087946f))
* version ([#18](https://github.com/bentatum/tenk/issues/18)) ([0ac3efd](https://github.com/bentatum/tenk/commit/0ac3efde848900a5732370d3cbd735182c4d0a6d))


### Features

* ci publishing ([#21](https://github.com/bentatum/tenk/issues/21)) ([c789b22](https://github.com/bentatum/tenk/commit/c789b22c031176a304e36dc608744b7ab1b22fad))
* ci publishing ([#22](https://github.com/bentatum/tenk/issues/22)) ([3efc960](https://github.com/bentatum/tenk/commit/3efc960ec46ed9c7b2bbc01e50778f24c16279bb))
* ci publishing ([#23](https://github.com/bentatum/tenk/issues/23)) ([8d142b0](https://github.com/bentatum/tenk/commit/8d142b0a01964c7aa0bcb9db2c72ebdb6a5a7ff2))
* ci publishing ([#24](https://github.com/bentatum/tenk/issues/24)) ([c37e901](https://github.com/bentatum/tenk/commit/c37e901e393f9264ddd7c285aeea8af6dd19bd7e))





# 0.2.0 (2022-10-14)


### Bug Fixes

* cli engine package version ([#3](https://github.com/bentatum/tenk/issues/3)) ([aee6c35](https://github.com/bentatum/tenk/commit/aee6c356b3bdbae6cb013d48c6fedbd5bf43a858))
* cli yarn lock ([#13](https://github.com/bentatum/tenk/issues/13)) ([bc888e0](https://github.com/bentatum/tenk/commit/bc888e058f5dce2e436d1ce4b4360bd253343423))
* cli yarn lock ([#17](https://github.com/bentatum/tenk/issues/17)) ([8d2eb2d](https://github.com/bentatum/tenk/commit/8d2eb2dcb4af53ffb61410f0473401a0a908661a))
* outdated lock file in cli package ([#10](https://github.com/bentatum/tenk/issues/10)) ([d2187b8](https://github.com/bentatum/tenk/commit/d2187b81a407fde48a23ea284b5aca657087946f))
* version ([#18](https://github.com/bentatum/tenk/issues/18)) ([0ac3efd](https://github.com/bentatum/tenk/commit/0ac3efde848900a5732370d3cbd735182c4d0a6d))


### Features

* ci publishing ([#21](https://github.com/bentatum/tenk/issues/21)) ([c789b22](https://github.com/bentatum/tenk/commit/c789b22c031176a304e36dc608744b7ab1b22fad))
* ci publishing ([#22](https://github.com/bentatum/tenk/issues/22)) ([3efc960](https://github.com/bentatum/tenk/commit/3efc960ec46ed9c7b2bbc01e50778f24c16279bb))
* ci publishing ([#23](https://github.com/bentatum/tenk/issues/23)) ([8d142b0](https://github.com/bentatum/tenk/commit/8d142b0a01964c7aa0bcb9db2c72ebdb6a5a7ff2))





# 0.2.0 (2022-10-14)


### Bug Fixes

* cli engine package version ([#3](https://github.com/bentatum/tenk/issues/3)) ([aee6c35](https://github.com/bentatum/tenk/commit/aee6c356b3bdbae6cb013d48c6fedbd5bf43a858))
* cli yarn lock ([#13](https://github.com/bentatum/tenk/issues/13)) ([bc888e0](https://github.com/bentatum/tenk/commit/bc888e058f5dce2e436d1ce4b4360bd253343423))
* cli yarn lock ([#17](https://github.com/bentatum/tenk/issues/17)) ([8d2eb2d](https://github.com/bentatum/tenk/commit/8d2eb2dcb4af53ffb61410f0473401a0a908661a))
* outdated lock file in cli package ([#10](https://github.com/bentatum/tenk/issues/10)) ([d2187b8](https://github.com/bentatum/tenk/commit/d2187b81a407fde48a23ea284b5aca657087946f))
* version ([#18](https://github.com/bentatum/tenk/issues/18)) ([0ac3efd](https://github.com/bentatum/tenk/commit/0ac3efde848900a5732370d3cbd735182c4d0a6d))


### Features

* ci publishing ([#21](https://github.com/bentatum/tenk/issues/21)) ([c789b22](https://github.com/bentatum/tenk/commit/c789b22c031176a304e36dc608744b7ab1b22fad))
* ci publishing ([#22](https://github.com/bentatum/tenk/issues/22)) ([3efc960](https://github.com/bentatum/tenk/commit/3efc960ec46ed9c7b2bbc01e50778f24c16279bb))





# 0.2.0 (2022-10-14)


### Bug Fixes

* cli engine package version ([#3](https://github.com/bentatum/tenk/issues/3)) ([aee6c35](https://github.com/bentatum/tenk/commit/aee6c356b3bdbae6cb013d48c6fedbd5bf43a858))
* cli yarn lock ([#13](https://github.com/bentatum/tenk/issues/13)) ([bc888e0](https://github.com/bentatum/tenk/commit/bc888e058f5dce2e436d1ce4b4360bd253343423))
* cli yarn lock ([#17](https://github.com/bentatum/tenk/issues/17)) ([8d2eb2d](https://github.com/bentatum/tenk/commit/8d2eb2dcb4af53ffb61410f0473401a0a908661a))
* outdated lock file in cli package ([#10](https://github.com/bentatum/tenk/issues/10)) ([d2187b8](https://github.com/bentatum/tenk/commit/d2187b81a407fde48a23ea284b5aca657087946f))
* version ([#18](https://github.com/bentatum/tenk/issues/18)) ([0ac3efd](https://github.com/bentatum/tenk/commit/0ac3efde848900a5732370d3cbd735182c4d0a6d))


### Features

* ci publishing ([#21](https://github.com/bentatum/tenk/issues/21)) ([c789b22](https://github.com/bentatum/tenk/commit/c789b22c031176a304e36dc608744b7ab1b22fad))





## 0.2.1 (2022-10-14)


### Bug Fixes

* cli engine package version ([#3](https://github.com/bentatum/tenk/issues/3)) ([aee6c35](https://github.com/bentatum/tenk/commit/aee6c356b3bdbae6cb013d48c6fedbd5bf43a858))
* cli yarn lock ([#13](https://github.com/bentatum/tenk/issues/13)) ([bc888e0](https://github.com/bentatum/tenk/commit/bc888e058f5dce2e436d1ce4b4360bd253343423))
* cli yarn lock ([#17](https://github.com/bentatum/tenk/issues/17)) ([8d2eb2d](https://github.com/bentatum/tenk/commit/8d2eb2dcb4af53ffb61410f0473401a0a908661a))
* outdated lock file in cli package ([#10](https://github.com/bentatum/tenk/issues/10)) ([d2187b8](https://github.com/bentatum/tenk/commit/d2187b81a407fde48a23ea284b5aca657087946f))
* version ([#18](https://github.com/bentatum/tenk/issues/18)) ([0ac3efd](https://github.com/bentatum/tenk/commit/0ac3efde848900a5732370d3cbd735182c4d0a6d))





## 0.2.1 (2022-10-13)


### Bug Fixes

* cli engine package version ([#3](https://github.com/bentatum/tenk/issues/3)) ([aee6c35](https://github.com/bentatum/tenk/commit/aee6c356b3bdbae6cb013d48c6fedbd5bf43a858))
* cli yarn lock ([#13](https://github.com/bentatum/tenk/issues/13)) ([bc888e0](https://github.com/bentatum/tenk/commit/bc888e058f5dce2e436d1ce4b4360bd253343423))
* cli yarn lock ([#17](https://github.com/bentatum/tenk/issues/17)) ([8d2eb2d](https://github.com/bentatum/tenk/commit/8d2eb2dcb4af53ffb61410f0473401a0a908661a))
* outdated lock file in cli package ([#10](https://github.com/bentatum/tenk/issues/10)) ([d2187b8](https://github.com/bentatum/tenk/commit/d2187b81a407fde48a23ea284b5aca657087946f))
* version ([#18](https://github.com/bentatum/tenk/issues/18)) ([0ac3efd](https://github.com/bentatum/tenk/commit/0ac3efde848900a5732370d3cbd735182c4d0a6d))





## [0.2.2](https://github.com/bentatum/tenk/compare/v0.2.1...v0.2.2) (2022-10-13)


### Bug Fixes

* cli yarn lock ([#17](https://github.com/bentatum/tenk/issues/17)) ([8d2eb2d](https://github.com/bentatum/tenk/commit/8d2eb2dcb4af53ffb61410f0473401a0a908661a))





## 0.2.1 (2022-10-13)


### Bug Fixes

* cli engine package version ([#3](https://github.com/bentatum/tenk/issues/3)) ([aee6c35](https://github.com/bentatum/tenk/commit/aee6c356b3bdbae6cb013d48c6fedbd5bf43a858))
* cli yarn lock ([#13](https://github.com/bentatum/tenk/issues/13)) ([bc888e0](https://github.com/bentatum/tenk/commit/bc888e058f5dce2e436d1ce4b4360bd253343423))
* outdated lock file in cli package ([#10](https://github.com/bentatum/tenk/issues/10)) ([d2187b8](https://github.com/bentatum/tenk/commit/d2187b81a407fde48a23ea284b5aca657087946f))





## [0.1.3](https://github.com/bentatum/tenk/compare/tenk@0.1.2...tenk@0.1.3) (2022-10-13)


### Bug Fixes

* cli yarn lock ([#13](https://github.com/bentatum/tenk/issues/13)) ([bc888e0](https://github.com/bentatum/tenk/commit/bc888e058f5dce2e436d1ce4b4360bd253343423))
* outdated lock file in cli package ([#10](https://github.com/bentatum/tenk/issues/10)) ([d2187b8](https://github.com/bentatum/tenk/commit/d2187b81a407fde48a23ea284b5aca657087946f))





## [0.1.2](https://github.com/bentatum/tenk/compare/tenk@0.1.1...tenk@0.1.2) (2022-10-13)

**Note:** Version bump only for package tenk





## [0.1.1](https://github.com/bentatum/tenk/compare/tenk@0.0.4...tenk@0.1.1) (2022-10-13)

**Note:** Version bump only for package tenk





## [0.0.4](https://github.com/bentatum/tenk/compare/tenk@0.0.3...tenk@0.0.4) (2022-10-13)

**Note:** Version bump only for package tenk





## 0.0.3 (2022-10-13)


### Bug Fixes

* cli engine package version ([#3](https://github.com/bentatum/tenk/issues/3)) ([aee6c35](https://github.com/bentatum/tenk/commit/aee6c356b3bdbae6cb013d48c6fedbd5bf43a858))
