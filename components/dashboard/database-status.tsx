'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Database, CheckCircle, XCircle, RefreshCw } from 'lucide-react'

interface DatabaseStatus {
  status: 'success' | 'error' | 'loading'
  message: string
  data?: {
    usersCount: number
    collectionsCount: number
    nftsCount: number
  }
}

export function DatabaseStatus() {
  const [status, setStatus] = useState<DatabaseStatus>({
    status: 'loading',
    message: 'Checking database connection...'
  })

  const testConnection = async () => {
    setStatus({
      status: 'loading',
      message: 'Testing database connection...'
    })

    try {
      const response = await fetch('/api/database/test', { cache: 'no-store' })
      const data = await response.json()

      if (response.ok) {
        setStatus({
          status: 'success',
          message: data.message,
          data: data.data
        })
      } else {
        setStatus({
          status: 'error',
          message: data.error || 'Database connection failed'
        })
      }
    } catch (error) {
      setStatus({
        status: 'error',
        message: 'Failed to test database connection'
      })
    }
  }

  useEffect(() => {
    testConnection()
    const interval = setInterval(testConnection, 5000) // Poll every 5 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Status
        </CardTitle>
        <CardDescription>
          PostgreSQL connection and data overview
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Connection Status</span>
            <div className="flex items-center gap-2">
              {status.status === 'loading' && (
                <RefreshCw className="h-4 w-4 animate-spin text-yellow-500" />
              )}
              {status.status === 'success' && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
              {status.status === 'error' && (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <Badge variant={status.status === 'success' ? 'default' : status.status === 'error' ? 'destructive' : 'secondary'}>
                {status.status === 'loading' ? 'Testing' : status.status === 'success' ? 'Connected' : 'Error'}
              </Badge>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            {status.message}
          </p>

          {status.data && (
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {status.data.usersCount}
                </div>
                <div className="text-xs text-muted-foreground">Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {status.data.collectionsCount}
                </div>
                <div className="text-xs text-muted-foreground">Collections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {status.data.nftsCount}
                </div>
                <div className="text-xs text-muted-foreground">NFTs</div>
              </div>
            </div>
          )}

          <Button 
            onClick={testConnection} 
            variant="outline" 
            size="sm"
            className="w-full"
            disabled={status.status === 'loading'}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${status.status === 'loading' ? 'animate-spin' : ''}`} />
            Test Connection
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 