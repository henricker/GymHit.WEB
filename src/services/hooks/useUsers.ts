import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { api } from '../axios';

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersRequest = {
  totalCount: number;
  users: User[];
};

export async function getUsers(page: number): Promise<GetUsersRequest> {
  const { data, headers } = await api.get('users', {
    params: {
      page,
    },
  });

  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  });

  return {
    users,
    totalCount,
  };
}

export function useUsers(
  page: number,
  options?: UseQueryOptions
): UseQueryResult<GetUsersRequest, unknown> {
  return useQuery(
    ['users', page],
    () => getUsers(page),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    },
    {
      ...options,
    }
  );
}
