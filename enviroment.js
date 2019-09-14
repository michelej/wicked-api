let env = {}    
function getEnviroment() {       
    env.apiVersion = "v1"
    env.basepath = '/wicked'
    env.basepathAPI = env.basepath + "/api/" + env.apiVersion    

    /**
     * LOCAL
     */
    if (process.env.NODE_ENV == undefined) {
        env.name = 'Local'        
        env.port = 3000        
        env.mongoDB = {
            url: "mongodb://localhost:27017",
            bd: "WickedDB"
        }        
    } else if (process.env.NODE_ENV == "development") {
    
    } else if (process.env.NODE_ENV == "production") {
    
    }
    return env
}
exports.getEnviroment = getEnviroment