import { Check } from "lucide-react"

interface StepsIndicatorProps {
  currentStep: number
}

export function StepsIndicator({ currentStep }: StepsIndicatorProps) {
  const steps = [
    { number: 1, title: "Basic Info" },
    { number: 2, title: "Settings" },
    { number: 3, title: "Deploy" },
  ]

  return (
    <div className="flex items-center justify-center space-x-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex items-center space-x-2">
            <div
              className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              ${
                currentStep > step.number
                  ? "bg-green-500 text-white"
                  : currentStep === step.number
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              }
            `}
            >
              {currentStep > step.number ? <Check className="w-4 h-4" /> : step.number}
            </div>
            <span
              className={`text-sm font-medium ${
                currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 h-0.5 mx-4 ${currentStep > step.number ? "bg-green-500" : "bg-muted"}`} />
          )}
        </div>
      ))}
    </div>
  )
}
