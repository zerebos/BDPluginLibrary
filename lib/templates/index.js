/**
 * 
 * @param {import("zerespluginlibrary").Plugin} Plugin 
 * @param {import("zerespluginlibrary").BoundAPI} Library 
 * @returns 
 */
module.exports = (Plugin, Library) => {

    const {Logger} = Library;
    
    return class extends Plugin {

        onStart() {
            Logger.info("Plugin enabled!");
        }

        onStop() {
            Logger.info("Plugin disabled!");
        }
    };

};