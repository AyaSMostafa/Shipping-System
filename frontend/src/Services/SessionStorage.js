import Cookies from 'universal-cookie';


const cookies = new Cookies();

let StoreLoginData = async (data) => {
    await cookies.set("token", data.token, { path: '/', expires: new Date(data.expiration) });
    await cookies.set("permissions", data.permissions, { path: '/', expires: new Date(data.expiration) });
    await cookies.set("role", data.role, { path: '/', expires: new Date(data.expiration) });
    await cookies.set("id", data.id, { path: '/', expires: new Date(data.expiration) });
}

let RemoveStoredData = async () => {
    await cookies.remove("token");
    await cookies.remove("permissions");
    await cookies.remove("role");
    await cookies.remove("id");
}

console.log("gi");
let HavePermission = (Permission) => {
    let permissions = cookies.get("permissions");
    let found = permissions.includes(Permission);
    // console.log(`Have permission: ${found}`);
    return found;
}

let GetAllermissions = () => {
    return cookies.get("permissions");
}

let GetUserIdentity = () => {
    return cookies.get("id");
}

let GetRole = () => {
    return cookies.get("role");
}

let GetToken = () => {
    return cookies.get("token");
}

let ContainData = () => {
    return Boolean(cookies.get("token"))
}


export let StorageHandler = {
    StoreLoginData,
    RemoveStoredData,
    HavePermission,
    GetAllermissions,
    GetUserIdentity,
    GetRole,
    GetToken,
    ContainData
};
