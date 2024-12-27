import {useState} from "react";
import {useAuthForm} from "@/app/auth/useAuthForm";
import styles from './Auth.module.scss';
// import logo from "../../../public/assets/images/logo.png";
import Image from "next/image";
import {Form} from "@/components/ui/form-elements/Form";
import {Card, CardContent, CardTitle} from "@/components/ui/Card";
import {AuthFields} from "@/app/auth/AuthFields";
import {Button} from "@/components/ui/Button";
import Link from "next/link";

export function Auth() {
    const [isReg, setIsReg] = useState(false);
    const {onSubmit, form, isPending} = useAuthForm(isReg)

    return (
        <div className={styles.wrapper}>
            <Card className={styles.card}>
                <CardTitle className={styles.logo}>
                    {/*<Image*/}
                    {/*    src={logo}*/}
                    {/*    width={208}*/}
                    {/*    height={150}*/}
                    {/*    alt={"logo"}*/}
                    {/*></Image>*/}
                </CardTitle>
                <CardContent className={styles.form}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <AuthFields
                                form={form}
                                isPending={isPending}
                                isReg={isReg}
                            />
                            <button disabled={isPending}
                                    className={"w-full bg-blue-500 text-white h-12 rounded-md mt-8"}>Go!
                            </button>
                        </form>
                    </Form>
                </CardContent>
                <Link href={"/forgot_password"} className={"ml-auto mr-2"}>Forgot password?</Link>
                <div className={"flex ml-auto gap-64 mt-2 mb-4 mr-3"}>
                    {/*<Link href={"/auth/login_by_qr"}>Login by QR</Link>*/}
                    <Link href={"/registration"}>Registration</Link>
                </div>
            </Card>
        </div>
    )
}