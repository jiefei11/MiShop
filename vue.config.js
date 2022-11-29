module.exports = {
    chainWebpack: (config) => {
        const oneOfsMap = config.module.rule("scss").oneOfs.store;
        oneOfsMap.forEach(item => {
            item
                .use("sass-resources-loader")
                .loader("sass-resources-loader")
                .options({
                    // 这里的路径不能使用 @ 符号，否则会报错
                    // resources: ["./src/assets/variables1.scss", "./src/assets/variables2.scss"]
                    resources: "./src/style/common.scss"
                })
                .end()
        })
    },
    lintOnSave: false,
}