
/**
 * User model used by the ReactUser component.
 * This is just a data holder with console logs doesn't have any authentication
 */
class User
{
    constructor(name, email, ID)
    {
        this.name = name;
        this.email = email;
        this.ID = ID;
    }

    getName()
    {
        return this.name;
    }

    getEmail()
    {
        return this.email;
    }

    getID()
    {
        return this.ID;
    }
    
    register()
    {
        console.log(this.name + " is now registered");
    }

    login()
    {
        console.log(this.name + " is now logged in");
    }

    searchEvents()
    {
        console.log(this.name + " is searching for events");
    }
}
export {User};