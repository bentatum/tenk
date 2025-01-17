# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.2.1](https://github.com/bentatum/tenk/compare/@tenk/engine@4.2.0...@tenk/engine@4.2.1) (2025-01-11)


### Bug Fixes

* **png:** call setup canvas ([#71](https://github.com/bentatum/tenk/issues/71)) ([d6286eb](https://github.com/bentatum/tenk/commit/d6286eb7c77d3665ec31f2fc6114bfcf19c46878))





# [4.2.0](https://github.com/bentatum/tenk/compare/@tenk/engine@4.1.0...@tenk/engine@4.2.0) (2023-01-16)


### Features

* layer display name ([#68](https://github.com/bentatum/tenk/issues/68)) ([3ea593a](https://github.com/bentatum/tenk/commit/3ea593a48ee477065b4973bcb061002b6ff34e07)), closes [Footwear#50](https://github.com/Footwear/issues/50) [Shoes#50](https://github.com/Shoes/issues/50) [Boots#50](https://github.com/Boots/issues/50)





# [4.1.0](https://github.com/bentatum/tenk/compare/@tenk/engine@4.0.0...@tenk/engine@4.1.0) (2023-01-09)


### Features

* disable dna ([#65](https://github.com/bentatum/tenk/issues/65)) ([0408309](https://github.com/bentatum/tenk/commit/04083096e89fbe9705f07d403823dd448fad21f3))





# [4.0.0](https://github.com/bentatum/tenk/compare/@tenk/engine@3.0.0...@tenk/engine@4.0.0) (2023-01-03)


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





# [3.0.0](https://github.com/bentatum/tenk/compare/@tenk/engine@2.0.0...@tenk/engine@3.0.0) (2023-01-01)


* feat!: layer attribute option (#62) ([e27038f](https://github.com/bentatum/tenk/commit/e27038fe649c9850f654ea534da4f769bc65f24e)), closes [#62](https://github.com/bentatum/tenk/issues/62)


### BREAKING CHANGES

* modifier renamed to modifyLayers
Added modifyMetadata option
Updated engine docs





# [2.0.0](https://github.com/bentatum/tenk/compare/@tenk/engine@0.1.0...@tenk/engine@2.0.0) (2022-12-30)



## 0.13.1 (2022-12-30)



# 0.13.0 (2022-12-24)



## 0.12.1 (2022-12-17)


### Bug Fixes

* dont push sublayers to top ([#57](https://github.com/bentatum/tenk/issues/57)) ([381bb14](https://github.com/bentatum/tenk/commit/381bb142dd7f47dc38fce43017dd984ec4a60659))



# 0.12.0 (2022-12-17)


* feat!: config key dot notation (#56) ([3f589b2](https://github.com/bentatum/tenk/commit/3f589b2ff57e406a3dcc375c84a08ef018eab307)), closes [#56](https://github.com/bentatum/tenk/issues/56)


### BREAKING CHANGES

* rules config are no longer case insensitive



# 0.11.0 (2022-12-14)



# 0.10.0 (2022-12-13)


### Features

* make elements configurable ([#54](https://github.com/bentatum/tenk/issues/54)) ([d43ab83](https://github.com/bentatum/tenk/commit/d43ab8305e96ba92d7377d9aaa5b407b33652dd6))



# 0.9.0 (2022-12-12)



# 0.8.0 (2022-12-11)



# 0.7.0 (2022-12-10)


### Features

* support layers with only sublayers ([#50](https://github.com/bentatum/tenk/issues/50)) ([4882dec](https://github.com/bentatum/tenk/commit/4882decb145301df1eaf15ade9fe30f4aee6c928))



# 0.6.0 (2022-10-18)



# 0.5.0 (2022-10-18)



## 0.4.4 (2022-10-16)



# 0.4.0 (2022-10-15)


### Features

* better error handling when layers directory is missing ([#34](https://github.com/bentatum/tenk/issues/34)) ([0970a77](https://github.com/bentatum/tenk/commit/0970a77a703d519d880087977e934346d1c03001))



## 0.3.2 (2022-10-15)



# 0.3.0 (2022-10-14)


### Bug Fixes

* version ([#26](https://github.com/bentatum/tenk/issues/26)) ([18da797](https://github.com/bentatum/tenk/commit/18da79749eba68447d4ca2637a16b8ced58ae5ab))
* version ([#27](https://github.com/bentatum/tenk/issues/27)) ([e9387f1](https://github.com/bentatum/tenk/commit/e9387f144f472d01b0c0309e83f0761a7c2cc664))
* version ([#28](https://github.com/bentatum/tenk/issues/28)) ([f3377eb](https://github.com/bentatum/tenk/commit/f3377ebce1aafd57d6ce3fd865288806ed394ccd))


### Features

* ci publishing ([#21](https://github.com/bentatum/tenk/issues/21)) ([c789b22](https://github.com/bentatum/tenk/commit/c789b22c031176a304e36dc608744b7ab1b22fad))
* ci publishing ([#22](https://github.com/bentatum/tenk/issues/22)) ([3efc960](https://github.com/bentatum/tenk/commit/3efc960ec46ed9c7b2bbc01e50778f24c16279bb))
* ci publishing ([#23](https://github.com/bentatum/tenk/issues/23)) ([8d142b0](https://github.com/bentatum/tenk/commit/8d142b0a01964c7aa0bcb9db2c72ebdb6a5a7ff2))
* ci publishing ([#24](https://github.com/bentatum/tenk/issues/24)) ([c37e901](https://github.com/bentatum/tenk/commit/c37e901e393f9264ddd7c285aeea8af6dd19bd7e))
* export element config interface ([#8](https://github.com/bentatum/tenk/issues/8)) ([7fc9370](https://github.com/bentatum/tenk/commit/7fc9370f7ec1b37b9e17aac21acfcd68b80d2b11))





## [0.13.1](https://github.com/bentatum/tenk/compare/v0.13.0...v0.13.1) (2022-12-30)

**Note:** Version bump only for package @tenk/engine





# [0.13.0](https://github.com/bentatum/tenk/compare/v0.12.1...v0.13.0) (2022-12-24)

**Note:** Version bump only for package @tenk/engine





## [0.12.1](https://github.com/bentatum/tenk/compare/v0.12.0...v0.12.1) (2022-12-17)


### Bug Fixes

* dont push sublayers to top ([#57](https://github.com/bentatum/tenk/issues/57)) ([381bb14](https://github.com/bentatum/tenk/commit/381bb142dd7f47dc38fce43017dd984ec4a60659))





# [0.12.0](https://github.com/bentatum/tenk/compare/v0.11.0...v0.12.0) (2022-12-17)


* feat!: config key dot notation (#56) ([3f589b2](https://github.com/bentatum/tenk/commit/3f589b2ff57e406a3dcc375c84a08ef018eab307)), closes [#56](https://github.com/bentatum/tenk/issues/56)


### BREAKING CHANGES

* rules config are no longer case insensitive





# [0.11.0](https://github.com/bentatum/tenk/compare/v0.10.0...v0.11.0) (2022-12-14)

**Note:** Version bump only for package @tenk/engine





# [0.10.0](https://github.com/bentatum/tenk/compare/v0.9.0...v0.10.0) (2022-12-13)


### Features

* make elements configurable ([#54](https://github.com/bentatum/tenk/issues/54)) ([d43ab83](https://github.com/bentatum/tenk/commit/d43ab8305e96ba92d7377d9aaa5b407b33652dd6))





# [0.9.0](https://github.com/bentatum/tenk/compare/v0.8.1...v0.9.0) (2022-12-12)

**Note:** Version bump only for package @tenk/engine





# [0.8.0](https://github.com/bentatum/tenk/compare/v0.7.0...v0.8.0) (2022-12-11)

**Note:** Version bump only for package @tenk/engine





# [0.7.0](https://github.com/bentatum/tenk/compare/v0.6.1...v0.7.0) (2022-12-10)


### Features

* support layers with only sublayers ([#50](https://github.com/bentatum/tenk/issues/50)) ([4882dec](https://github.com/bentatum/tenk/commit/4882decb145301df1eaf15ade9fe30f4aee6c928))





# [0.6.0](https://github.com/bentatum/tenk/compare/v0.5.0...v0.6.0) (2022-10-18)

**Note:** Version bump only for package @tenk/engine





# [0.5.0](https://github.com/bentatum/tenk/compare/v0.4.9...v0.5.0) (2022-10-18)

**Note:** Version bump only for package @tenk/engine





## [0.4.4](https://github.com/bentatum/tenk/compare/v0.4.3...v0.4.4) (2022-10-16)

**Note:** Version bump only for package @tenk/engine





# [0.4.0](https://github.com/bentatum/tenk/compare/v0.3.4...v0.4.0) (2022-10-15)


### Features

* better error handling when layers directory is missing ([#34](https://github.com/bentatum/tenk/issues/34)) ([0970a77](https://github.com/bentatum/tenk/commit/0970a77a703d519d880087977e934346d1c03001))





## [0.3.2](https://github.com/bentatum/tenk/compare/v0.3.1...v0.3.2) (2022-10-15)

**Note:** Version bump only for package @tenk/engine





# 0.3.0 (2022-10-14)


### Bug Fixes

* version ([#26](https://github.com/bentatum/tenk/issues/26)) ([18da797](https://github.com/bentatum/tenk/commit/18da79749eba68447d4ca2637a16b8ced58ae5ab))
* version ([#27](https://github.com/bentatum/tenk/issues/27)) ([e9387f1](https://github.com/bentatum/tenk/commit/e9387f144f472d01b0c0309e83f0761a7c2cc664))
* version ([#28](https://github.com/bentatum/tenk/issues/28)) ([f3377eb](https://github.com/bentatum/tenk/commit/f3377ebce1aafd57d6ce3fd865288806ed394ccd))


### Features

* **broken-rule-threshold:** boost default value to 1000000 ([#6](https://github.com/bentatum/tenk/issues/6)) ([973c327](https://github.com/bentatum/tenk/commit/973c327459cb62f72cc9888b0217dec50d9c7e0e))
* ci publishing ([#21](https://github.com/bentatum/tenk/issues/21)) ([c789b22](https://github.com/bentatum/tenk/commit/c789b22c031176a304e36dc608744b7ab1b22fad))
* ci publishing ([#22](https://github.com/bentatum/tenk/issues/22)) ([3efc960](https://github.com/bentatum/tenk/commit/3efc960ec46ed9c7b2bbc01e50778f24c16279bb))
* ci publishing ([#23](https://github.com/bentatum/tenk/issues/23)) ([8d142b0](https://github.com/bentatum/tenk/commit/8d142b0a01964c7aa0bcb9db2c72ebdb6a5a7ff2))
* ci publishing ([#24](https://github.com/bentatum/tenk/issues/24)) ([c37e901](https://github.com/bentatum/tenk/commit/c37e901e393f9264ddd7c285aeea8af6dd19bd7e))
* export element config interface ([#8](https://github.com/bentatum/tenk/issues/8)) ([7fc9370](https://github.com/bentatum/tenk/commit/7fc9370f7ec1b37b9e17aac21acfcd68b80d2b11))





# 0.3.0 (2022-10-14)


### Bug Fixes

* version ([#26](https://github.com/bentatum/tenk/issues/26)) ([18da797](https://github.com/bentatum/tenk/commit/18da79749eba68447d4ca2637a16b8ced58ae5ab))
* version ([#27](https://github.com/bentatum/tenk/issues/27)) ([e9387f1](https://github.com/bentatum/tenk/commit/e9387f144f472d01b0c0309e83f0761a7c2cc664))


### Features

* **broken-rule-threshold:** boost default value to 1000000 ([#6](https://github.com/bentatum/tenk/issues/6)) ([973c327](https://github.com/bentatum/tenk/commit/973c327459cb62f72cc9888b0217dec50d9c7e0e))
* ci publishing ([#21](https://github.com/bentatum/tenk/issues/21)) ([c789b22](https://github.com/bentatum/tenk/commit/c789b22c031176a304e36dc608744b7ab1b22fad))
* ci publishing ([#22](https://github.com/bentatum/tenk/issues/22)) ([3efc960](https://github.com/bentatum/tenk/commit/3efc960ec46ed9c7b2bbc01e50778f24c16279bb))
* ci publishing ([#23](https://github.com/bentatum/tenk/issues/23)) ([8d142b0](https://github.com/bentatum/tenk/commit/8d142b0a01964c7aa0bcb9db2c72ebdb6a5a7ff2))
* ci publishing ([#24](https://github.com/bentatum/tenk/issues/24)) ([c37e901](https://github.com/bentatum/tenk/commit/c37e901e393f9264ddd7c285aeea8af6dd19bd7e))
* export element config interface ([#8](https://github.com/bentatum/tenk/issues/8)) ([7fc9370](https://github.com/bentatum/tenk/commit/7fc9370f7ec1b37b9e17aac21acfcd68b80d2b11))





# 0.3.0 (2022-10-14)


### Bug Fixes

* version ([#26](https://github.com/bentatum/tenk/issues/26)) ([18da797](https://github.com/bentatum/tenk/commit/18da79749eba68447d4ca2637a16b8ced58ae5ab))


### Features

* **broken-rule-threshold:** boost default value to 1000000 ([#6](https://github.com/bentatum/tenk/issues/6)) ([973c327](https://github.com/bentatum/tenk/commit/973c327459cb62f72cc9888b0217dec50d9c7e0e))
* ci publishing ([#21](https://github.com/bentatum/tenk/issues/21)) ([c789b22](https://github.com/bentatum/tenk/commit/c789b22c031176a304e36dc608744b7ab1b22fad))
* ci publishing ([#22](https://github.com/bentatum/tenk/issues/22)) ([3efc960](https://github.com/bentatum/tenk/commit/3efc960ec46ed9c7b2bbc01e50778f24c16279bb))
* ci publishing ([#23](https://github.com/bentatum/tenk/issues/23)) ([8d142b0](https://github.com/bentatum/tenk/commit/8d142b0a01964c7aa0bcb9db2c72ebdb6a5a7ff2))
* ci publishing ([#24](https://github.com/bentatum/tenk/issues/24)) ([c37e901](https://github.com/bentatum/tenk/commit/c37e901e393f9264ddd7c285aeea8af6dd19bd7e))
* export element config interface ([#8](https://github.com/bentatum/tenk/issues/8)) ([7fc9370](https://github.com/bentatum/tenk/commit/7fc9370f7ec1b37b9e17aac21acfcd68b80d2b11))





# 0.3.0 (2022-10-14)


### Features

* **broken-rule-threshold:** boost default value to 1000000 ([#6](https://github.com/bentatum/tenk/issues/6)) ([973c327](https://github.com/bentatum/tenk/commit/973c327459cb62f72cc9888b0217dec50d9c7e0e))
* ci publishing ([#21](https://github.com/bentatum/tenk/issues/21)) ([c789b22](https://github.com/bentatum/tenk/commit/c789b22c031176a304e36dc608744b7ab1b22fad))
* ci publishing ([#22](https://github.com/bentatum/tenk/issues/22)) ([3efc960](https://github.com/bentatum/tenk/commit/3efc960ec46ed9c7b2bbc01e50778f24c16279bb))
* ci publishing ([#23](https://github.com/bentatum/tenk/issues/23)) ([8d142b0](https://github.com/bentatum/tenk/commit/8d142b0a01964c7aa0bcb9db2c72ebdb6a5a7ff2))
* ci publishing ([#24](https://github.com/bentatum/tenk/issues/24)) ([c37e901](https://github.com/bentatum/tenk/commit/c37e901e393f9264ddd7c285aeea8af6dd19bd7e))
* export element config interface ([#8](https://github.com/bentatum/tenk/issues/8)) ([7fc9370](https://github.com/bentatum/tenk/commit/7fc9370f7ec1b37b9e17aac21acfcd68b80d2b11))





# 0.2.0 (2022-10-14)


### Features

* **broken-rule-threshold:** boost default value to 1000000 ([#6](https://github.com/bentatum/tenk/issues/6)) ([973c327](https://github.com/bentatum/tenk/commit/973c327459cb62f72cc9888b0217dec50d9c7e0e))
* ci publishing ([#21](https://github.com/bentatum/tenk/issues/21)) ([c789b22](https://github.com/bentatum/tenk/commit/c789b22c031176a304e36dc608744b7ab1b22fad))
* ci publishing ([#22](https://github.com/bentatum/tenk/issues/22)) ([3efc960](https://github.com/bentatum/tenk/commit/3efc960ec46ed9c7b2bbc01e50778f24c16279bb))
* ci publishing ([#23](https://github.com/bentatum/tenk/issues/23)) ([8d142b0](https://github.com/bentatum/tenk/commit/8d142b0a01964c7aa0bcb9db2c72ebdb6a5a7ff2))
* ci publishing ([#24](https://github.com/bentatum/tenk/issues/24)) ([c37e901](https://github.com/bentatum/tenk/commit/c37e901e393f9264ddd7c285aeea8af6dd19bd7e))
* export element config interface ([#8](https://github.com/bentatum/tenk/issues/8)) ([7fc9370](https://github.com/bentatum/tenk/commit/7fc9370f7ec1b37b9e17aac21acfcd68b80d2b11))





# 0.2.0 (2022-10-14)


### Features

* **broken-rule-threshold:** boost default value to 1000000 ([#6](https://github.com/bentatum/tenk/issues/6)) ([973c327](https://github.com/bentatum/tenk/commit/973c327459cb62f72cc9888b0217dec50d9c7e0e))
* ci publishing ([#21](https://github.com/bentatum/tenk/issues/21)) ([c789b22](https://github.com/bentatum/tenk/commit/c789b22c031176a304e36dc608744b7ab1b22fad))
* ci publishing ([#22](https://github.com/bentatum/tenk/issues/22)) ([3efc960](https://github.com/bentatum/tenk/commit/3efc960ec46ed9c7b2bbc01e50778f24c16279bb))
* ci publishing ([#23](https://github.com/bentatum/tenk/issues/23)) ([8d142b0](https://github.com/bentatum/tenk/commit/8d142b0a01964c7aa0bcb9db2c72ebdb6a5a7ff2))
* export element config interface ([#8](https://github.com/bentatum/tenk/issues/8)) ([7fc9370](https://github.com/bentatum/tenk/commit/7fc9370f7ec1b37b9e17aac21acfcd68b80d2b11))





# 0.2.0 (2022-10-14)


### Features

* **broken-rule-threshold:** boost default value to 1000000 ([#6](https://github.com/bentatum/tenk/issues/6)) ([973c327](https://github.com/bentatum/tenk/commit/973c327459cb62f72cc9888b0217dec50d9c7e0e))
* ci publishing ([#21](https://github.com/bentatum/tenk/issues/21)) ([c789b22](https://github.com/bentatum/tenk/commit/c789b22c031176a304e36dc608744b7ab1b22fad))
* ci publishing ([#22](https://github.com/bentatum/tenk/issues/22)) ([3efc960](https://github.com/bentatum/tenk/commit/3efc960ec46ed9c7b2bbc01e50778f24c16279bb))
* export element config interface ([#8](https://github.com/bentatum/tenk/issues/8)) ([7fc9370](https://github.com/bentatum/tenk/commit/7fc9370f7ec1b37b9e17aac21acfcd68b80d2b11))





# 0.2.0 (2022-10-14)


### Features

* **broken-rule-threshold:** boost default value to 1000000 ([#6](https://github.com/bentatum/tenk/issues/6)) ([973c327](https://github.com/bentatum/tenk/commit/973c327459cb62f72cc9888b0217dec50d9c7e0e))
* ci publishing ([#21](https://github.com/bentatum/tenk/issues/21)) ([c789b22](https://github.com/bentatum/tenk/commit/c789b22c031176a304e36dc608744b7ab1b22fad))
* export element config interface ([#8](https://github.com/bentatum/tenk/issues/8)) ([7fc9370](https://github.com/bentatum/tenk/commit/7fc9370f7ec1b37b9e17aac21acfcd68b80d2b11))





# [0.2.0](https://github.com/bentatum/tenk/compare/@tenk/engine@0.1.0...@tenk/engine@0.2.0) (2022-10-13)


### Features

* export element config interface ([#8](https://github.com/bentatum/tenk/issues/8)) ([7fc9370](https://github.com/bentatum/tenk/commit/7fc9370f7ec1b37b9e17aac21acfcd68b80d2b11))





# [0.1.0](https://github.com/bentatum/tenk/compare/@tenk/engine@0.0.3...@tenk/engine@0.1.0) (2022-10-13)


### Features

* **broken-rule-threshold:** boost default value to 1000000 ([#6](https://github.com/bentatum/tenk/issues/6)) ([973c327](https://github.com/bentatum/tenk/commit/973c327459cb62f72cc9888b0217dec50d9c7e0e))





## 0.0.3 (2022-10-13)

**Note:** Version bump only for package @tenk/engine
