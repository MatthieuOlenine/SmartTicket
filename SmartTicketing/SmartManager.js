const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, './SmartDB.json');

class SmartManager {
    constructor() {
        this.fs = fs;
        this.path = path;
        this.filePath = filePath;
        this.MaxEvent = 5;
        this.Data = []
        try {
            const data = this.fs.readFileSync(this.filePath, 'utf8');
            this.Data = JSON.parse(data);
        } catch (error) {
            console.error('\nErreur lors de la récupération du fichiers produits - code 11', error);
        }
    }

    AddEvent(_name, _max = 5) {
        for (let i of this.Data) {
            if (i.name === _name) {
                console.log('\nCe nom est déjà utilisé');                    
                return(false)
            }
        }

        if (this.Data.length >= this.MaxEvent) {
            console.log('\nIl ne peut pas éxister plus de ', this.MaxEvent, 'évènements en même temps. Supprimez ceux éxistant pour en créer un nouveau');                    
            return(false)
        }

        const NewEvent = {
            type : "smart",
            name : _name,
            address : crypto.createHash('sha256').update(_name).digest('hex'),
            horodatage : new Date().toISOString(),
            max : _max,
            registered : []
        }

        this.Data.push(NewEvent);
        this.UpToDate()
    }

    DelEvent(_name) {
        for (let i of this.Data) {
            if (i.name === _name) {
                this.Data = this.Data.filter(i => i.name !== _name);
                console.log('\n',_name,'supprimé avec succès');
            }
        }

        this.UpToDate()
    }

    GetEvent() {
        return(this.Data)
    }

    AddRegistered(_eventname, _name) {
        const NewRegistered = {
            parameter : "admin",
            name : _name,
            address : crypto.createHash('sha256').update("admin" + _name).digest('hex'),
            horodatage : new Date().toISOString()
        }

        for (let i of this.Data) {
            if (i.name === _eventname) {

                for (let j of i.registered) {
                    if (j.name === _name) {
                        console.log('\nCe nom est déjà utilisé');                    
                        return(false)
                    }
                }
                
                if (i.registered.length >= i.max) {
                    console.log('\nCet évènement ne peut pas accueillir plus de', i.max, 'personnes');                    
                    return(false)
                }

                i.registered.push(NewRegistered);
            }
        }

        this.UpToDate()
    }

    SetRegistered(_eventname, _parameter) {
        for (let i of this.Data) {
            if (i.name === _eventname) {
                for (let j of i.registered) {
                    j.parameter = _parameter;
                    j.address = crypto.createHash('sha256').update(_parameter + j.name).digest('hex');
                }
            }
        }

        this.UpToDate()
    }

    DelRegistered(_eventname, _name) {
        for (let i of this.Data) {
            if (i.name === _eventname) {
                for (let j of i.registered) {
                    if (j.name === _name) {
                        i.registered = i.registered.filter(i => i.name !== _name);
                        this.Data.registered = i.registered;
                        console.log('\n',_name,'supprimé avec succès');
                    }
                }
            }
        }

        this.UpToDate()
    }

    LogIn(_eventname, _address) {
        for (let i of this.Data) {
            if (i.name === _eventname) {
                for (let j of i.registered) {
                    if (j.address === _address) {
                        this.SetRegistered(_eventname, _name);
                        return(true)
                    }
                }
                return(false)
            }
        }
    }

    UpToDateDataClient(_eventname, _name) {
        for (let i of this.Data) {
            if (i.name === _eventname) {
                for (let j of i.registered) {
                    if (j.name === _name) {
                        return(j.address)
                    }
                }
                return(false)
            }
        }
    }

    UpToDate() {
        try {
            this.fs.writeFileSync(this.filePath, JSON.stringify(this.Data, null, 2), 'utf8');
            console.log('\nOpération enregistrés avec succès');
        } catch (error) {
            console.error('\nErreur lors de L\'enregistrement de l\'opération', error);
        }
    }
}

module.exports = SmartManager;