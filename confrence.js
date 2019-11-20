module.exports = class Conference
{
    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    printNameLater() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(this._name);

                resolve(Math.random());
            }, 500);
        });
    }
};