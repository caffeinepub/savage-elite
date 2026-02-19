import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MerchItem {
    id: bigint;
    name: string;
    description: string;
    imageUrl: string;
    price: bigint;
}
export interface CartItem {
    itemId: bigint;
    quantity: bigint;
}
export interface UserProfile {
    name: string;
    gamerTag: string;
}
export interface TeamSignup {
    experienceLevel: string;
    email: string;
    preferredRole: string;
    gamerTag: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addMerchItem(name: string, description: string, price: bigint, imageUrl: string): Promise<void>;
    addToCart(itemId: bigint, quantity: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    getAllMerchItems(): Promise<Array<MerchItem>>;
    getAllSignups(): Promise<Array<TeamSignup>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<CartItem>>;
    getTeamSignup(): Promise<TeamSignup | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitTeamSignup(signup: TeamSignup): Promise<void>;
    updateCartItem(itemId: bigint, newQuantity: bigint): Promise<void>;
}
