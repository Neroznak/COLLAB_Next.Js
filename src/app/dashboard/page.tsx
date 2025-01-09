import {Header} from "@/app/dashboard/header";
import {Card} from "@/components/ui/Card";


export default function Dashboard() {


    return (
        <div>
            <Header/>
            <div className={"pl-2 mt-2"}><p className={"font-bold text-2xl"}>Наши курсы</p></div>
            <div className={"flex justify-center"}>
                <div className={"flex flex-wrap w-3/4  gap-4 ml-4 mt-2"}>
                    <Card className={"flex w-64 h-64"}>1</Card>
                    <Card className={"flex w-64 h-64"}>1</Card>
                    <Card className={"flex w-64 h-64"}>1</Card>
                    <Card className={"flex w-64 h-64"}>1</Card>
                    <Card className={"flex w-64 h-64"}>1</Card>
                    <Card className={"flex w-64 h-64"}>1</Card>
                    <Card className={"flex w-64 h-64"}>1</Card>
                    <Card className={"flex w-64 h-64"}>1</Card>
                    <Card className={"flex w-64 h-64"}>1</Card>
                    <Card className={"flex w-64 h-64"}>1</Card>
                    <Card className={"flex w-64 h-64"}>1</Card>
                    <Card className={"flex w-64 h-64"}>1</Card>
                    <Card className={"flex w-64 h-64"}>1</Card>
                    <Card className={"flex w-64 h-64"}>1</Card>
                </div>
            </div>
        </div>
    )
};

