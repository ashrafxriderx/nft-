"use client"

import { useState } from "react"
import { CreateCollectionForm } from "@/components/create/collection-form"
import { PreviewCard } from "@/components/create/preview-card"
import { StepsIndicator } from "@/components/create/steps-indicator"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [collectionData, setCollectionData] = useState({
    name: "",
    description: "",
    symbol: "",
    maxSupply: 1000,
    mintPrice: 0.1,
    image: null,
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Create NFT Collection</h1>
          <p className="text-muted-foreground mt-2">Launch your NFT collection on Monad with zero code required</p>
        </div>

        <StepsIndicator currentStep={currentStep} />

        <div className="grid gap-8 lg:grid-cols-2 mt-8">
          <CreateCollectionForm
            data={collectionData}
            setData={setCollectionData}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
          <PreviewCard data={collectionData} />
        </div>
      </div>
    </div>
  )
}
