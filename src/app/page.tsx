import MainLayout from "@/layout/MainLayout";
import { Button } from "@/shadcn/components/ui/button";

export default function Home() {
     return (
          <MainLayout title="Home">
               <p>Hola mundo</p>
               <Button>Click me</Button>
          </MainLayout>
     );
}
