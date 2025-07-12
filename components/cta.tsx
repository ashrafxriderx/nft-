import { Button } from "@/components/ui/button"
import { ArrowRight, Rocket } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Launch Your NFT Collection?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of creators who have already launched successful NFT collections on Monad with NFT Terminal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
                <Rocket className="w-5 h-5 mr-2" />
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
            >
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
