function sleep(ms=1000) {
    return new Promise(res => setTimeout(() => {
        res(console.log(`Natija: Kod ${ms} ms ishga tushdi`)
        )
    },ms))
}
module.exports={sleep}