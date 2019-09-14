module.exports.printLog = (message) => {
    console.log("["+new Date().toISOString().replace("T"," ").split(".")[0] +"] - "+message)
}