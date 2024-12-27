import { UseFormReturn } from 'react-hook-form'
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'

import { IAuthForm } from '@/shared/types/auth.interface'
import styles from "@/app/auth/Auth.module.scss";
import {Label} from "@/components/ui/form-elements/Label";

interface AuthFieldsProps {
	form: UseFormReturn<IAuthForm, any, undefined>
	isPending: boolean
	isReg?: boolean
}

export function AuthFields({
							   form,
							   isPending,
							   isReg = false
						   }: AuthFieldsProps) {
	return (
		<>
			<Label>Login</Label>
			<FormField
				control={form.control}

				name='phoneNumber'
				rules={{
					required: 'Телефон обязательна',
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								placeholder='+79169530222'
								type='phoneNumber'
								className={styles.form_input}
								disabled={isPending}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<Label>Password</Label>
			<FormField
				control={form.control}
				name='password'
				rules={{
					required: 'Пароль обязателен',
					minLength: {
						value: 6,
						message: 'Минимум 6 символов'
					}
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								placeholder='password'
								type='password'
								disabled={isPending}
								className={styles.form_input}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}




export default AuthFields;