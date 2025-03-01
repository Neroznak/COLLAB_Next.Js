import { createContext, useContext } from "react";

const colors = ["#000000", "#FFD700", "#32CD32", "#FF6600", "#FF3366"];
// Тип контекста
interface UserColorContextType {
    getUserColor: (userId: number) => string;
}

// Создаём контекст с заглушкой
const UserColorContext = createContext<UserColorContextType | null>(null);

// Функция для доступа к контексту
export const useUserColor = () => {
    const context = useContext(UserColorContext);
    if (!context) {
        throw new Error("useUserColor must be used within a UserColorProvider");
    }
    return context;
};

// Провайдер контекста
export const UserColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const getUserColor = (userId: number): string => {
        return colors[userId % colors.length];
    };

    return (
        <UserColorContext.Provider value={{ getUserColor }}>
            {children}
        </UserColorContext.Provider>
    );
};
