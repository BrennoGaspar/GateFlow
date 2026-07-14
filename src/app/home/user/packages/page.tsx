"use client"

import PackageCard from "@/components/packageCard";
import Sidebar from "@/components/sidebar";

export default function PackagePage() {

    return(

        <div>
            <Sidebar/>
            <PackageCard
                nomeNota="Gian"
                dataHora="2026-07-14T21:33:35"
                status="Pendente"
                apartamento={1}
            />
        </div>    

    );

};