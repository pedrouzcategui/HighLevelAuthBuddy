'use client'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Company, Location } from "@prisma/client"

type AgenciesAccordionProps = {
    companies: Company[] | Location[]
}

export function CompanyLocationAccordion({ companies }: AgenciesAccordionProps) {
    return (
        <Accordion type="single" collapsible>
            {
                companies.map(company => (
                    <AccordionItem value="item-1">
                        <AccordionTrigger>{company.name}</AccordionTrigger>
                        <AccordionContent>
                            Locations
                            {/* {company.} */}
                        </AccordionContent>
                    </AccordionItem>
                ))
            }
        </Accordion>
    )
}