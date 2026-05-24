export const ResourceName = GetCurrentResourceName();
export const ResourceContext = IsDuplicityVersion() ? "server" : "client";
export const isClient = ResourceContext === "client";
export const isServer = ResourceContext === "server";
