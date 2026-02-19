import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, TeamSignup, MerchItem, CartItem } from '../backend';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Team Signup Queries
export function useSubmitTeamSignup() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (signup: TeamSignup) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitTeamSignup(signup);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamSignup'] });
    },
  });
}

export function useGetTeamSignup() {
  const { actor, isFetching } = useActor();

  return useQuery<TeamSignup | null>({
    queryKey: ['teamSignup'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTeamSignup();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllSignups() {
  const { actor, isFetching } = useActor();

  return useQuery<TeamSignup[]>({
    queryKey: ['allSignups'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSignups();
    },
    enabled: !!actor && !isFetching,
  });
}

// Merch Queries
export function useGetAllMerchItems() {
  const { actor, isFetching } = useActor();

  return useQuery<MerchItem[]>({
    queryKey: ['merchItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMerchItems();
    },
    enabled: !!actor && !isFetching,
  });
}

// Cart Queries
export function useGetCart() {
  const { actor, isFetching } = useActor();

  return useQuery<CartItem[]>({
    queryKey: ['cart'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCart();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddToCart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: bigint; quantity: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addToCart(itemId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useUpdateCartItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ itemId, newQuantity }: { itemId: bigint; newQuantity: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateCartItem(itemId, newQuantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useClearCart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.clearCart();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

// Admin Queries
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
