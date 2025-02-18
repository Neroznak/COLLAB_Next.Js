import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.service'

export function useProfile() {
	const { data: user, isLoading } = useQuery({
		queryKey: ["profile"],
		queryFn: userService.getProfile, // ✅ Убираем async, просто передаём ссылку на функцию
		staleTime: 1000 * 60 * 5, // ✅ Данные кэшируются на 5 минут, чтобы уменьшить запросы
		retry: 1, // ✅ Уменьшаем количество повторов запроса
	});

	return { user, isLoading };
}
