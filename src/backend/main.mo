import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Types
  public type UserProfile = {
    name : Text;
    gamerTag : Text;
  };

  public type TeamSignup = {
    gamerTag : Text;
    email : Text;
    preferredRole : Text;
    experienceLevel : Text;
  };

  public type MerchItem = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
  };

  public type CartItem = {
    itemId : Nat;
    quantity : Nat;
  };

  // State
  let userProfiles = Map.empty<Principal, UserProfile>();
  let teamSignups = Map.empty<Principal, TeamSignup>();
  let merchStore = Map.empty<Nat, MerchItem>();
  var nextMerchId = 0;

  let shoppingCarts = Map.empty<Principal, [CartItem]>();

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Team Signup Functions
  public shared ({ caller }) func submitTeamSignup(signup : TeamSignup) : async () {
    teamSignups.add(caller, signup);
  };

  public query ({ caller }) func getTeamSignup() : async ?TeamSignup {
    teamSignups.get(caller);
  };

  public query ({ caller }) func getAllSignups() : async [TeamSignup] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all signups");
    };
    teamSignups.values().toArray();
  };

  // Merch Store Functions
  public shared ({ caller }) func addMerchItem(name : Text, description : Text, price : Nat, imageUrl : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add merch items");
    };
    let item : MerchItem = {
      id = nextMerchId;
      name;
      description;
      price;
      imageUrl;
    };
    merchStore.add(nextMerchId, item);
    nextMerchId += 1;
  };

  public query ({ caller }) func getAllMerchItems() : async [MerchItem] {
    merchStore.values().toArray();
  };

  // Shopping Cart Functions
  public shared ({ caller }) func addToCart(itemId : Nat, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add items to cart");
    };

    let currentCart = switch (shoppingCarts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart };
    };

    let existingItemIndex = currentCart.findIndex(func(cartItem) { cartItem.itemId == itemId });

    let updatedCart = switch (existingItemIndex) {
      case (null) {
        currentCart.concat([{
          itemId;
          quantity;
        }]);
      };
      case (?index) {
        Array.tabulate(
          currentCart.size(),
          func(i) {
            if (i == index) {
              {
                itemId;
                quantity = currentCart[i].quantity + quantity;
              };
            } else {
              currentCart[i];
            };
          },
        );
      };
    };

    shoppingCarts.add(caller, updatedCart);
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view cart");
    };
    switch (shoppingCarts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart };
    };
  };

  public shared ({ caller }) func updateCartItem(itemId : Nat, newQuantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update cart items");
    };

    let currentCart = switch (shoppingCarts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart };
    };

    let updatedCart = currentCart.map(
      func(cartItem) {
        if (cartItem.itemId == itemId) {
          {
            itemId;
            quantity = newQuantity;
          };
        } else {
          cartItem;
        };
      }
    );

    shoppingCarts.add(caller, updatedCart);
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can clear cart");
    };
    shoppingCarts.remove(caller);
  };
};
