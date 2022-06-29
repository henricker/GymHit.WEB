import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { api } from '../axios';

type User = {
  id: number;
  name: string;
  cpf: string;
  telephone: string;
  createdAt: string;
};

type GetUsersRequest = {
  totalCount: number;
  users: User[];
};

export async function getUsers(page: number, pattern?: string): Promise<GetUsersRequest> {
  const { data, headers } = await api.get('pupils', {
    params: {
      page,
      pattern: pattern,
    },
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).accessToken}`
    },
  });

  const users = data.pupils.map(user => {
    return {
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      telephone: user.telephone,
      createdAt: new Date(user.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  });

  const totalCount = data.totalCounts;

  return {
    users,
    totalCount,
  };
}

export function useUsers(
  page: number,
  options?: UseQueryOptions,
  pattern?: string
): UseQueryResult<GetUsersRequest, unknown> {
  return useQuery(
    ['users', page, pattern],
    () => getUsers(page, pattern),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    },
    {
      ...options,
    }
  );
}
