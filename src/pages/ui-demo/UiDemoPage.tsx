import React from 'react'
import BasePage from '@components/base-page'
import { Button, Checkbox, Radio, Badge, Breadcrumbs, Text, Input, Tabs } from '@ui'

export default function UiDemoPage() {
  return (
    <BasePage>
      <div className="max-w-xl mx-auto bg-white shadow-sm rounded p-8 mt-6">
        <h1 className="text-2xl font-bold">
          UI Kit Demo
        </h1>
        <p className="mt-3 text-gray-600">
          Демонстрація всіх компонентів UI-kit
        </p>
        <div className="mt-6 space-y-10">
          <div>
            <h2 className="font-semibold mb-2">Medium (16px, bold)</h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="contained" size="medium">Label →</Button>
              <Button variant="subtle" size="medium">Label →</Button>
              <Button variant="outlined" size="medium">Label →</Button>
              <Button variant="ghost" size="medium">Label →</Button>
              <Button variant="contained" size="medium" disabled>Label →</Button>
              <Button variant="contained" size="medium" loading />
            </div>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Small (14px)</h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="contained" size="small">Label →</Button>
              <Button variant="subtle" size="small">Label →</Button>
              <Button variant="outlined" size="small">Label →</Button>
              <Button variant="ghost" size="small">Label →</Button>
              <Button variant="contained" size="small" disabled>Label →</Button>
              <Button variant="contained" size="small" loading />
            </div>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Checkbox</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-8">
                <Checkbox defaultChecked={false} label="Checkbox option" />
                <Checkbox defaultChecked label="Checkbox option" />
              </div>
              <div className="flex items-center gap-8">
                <Checkbox defaultChecked={false} label="Checkbox option" />
                <Checkbox defaultChecked label="Checkbox option" />
              </div>
              <div className="flex items-center gap-8">
                <Checkbox disabled defaultChecked={false} label="Checkbox option" />
                <Checkbox disabled defaultChecked label="Checkbox option" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Radio</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-8">
                <Radio name="r1" defaultChecked={false} label="Radio option" />
                <Radio name="r1" defaultChecked label="Radio option" />
              </div>
              <div className="flex items-center gap-8">
                <Radio name="r2" defaultChecked={false} label="Radio option" />
                <Radio name="r2" defaultChecked label="Radio option" />
              </div>
              <div className="flex items-center gap-8">
                <Radio name="r3" disabled defaultChecked={false} label="Radio option" />
                <Radio name="r3" disabled defaultChecked label="Radio option" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Badge</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge sentiment="neutral">5</Badge>
                <Badge sentiment="positive">5</Badge>
                <Badge sentiment="negative">5</Badge>
                <Badge sentiment="attentive">5</Badge>
                <Badge sentiment="informative">5</Badge>
                <Badge sentiment="positive">new</Badge>
                <Badge sentiment="attentive">sale</Badge>
              </div>
              <div className="flex items-center gap-4">
                <Badge sentiment="neutral" showText={false} />
                <Badge sentiment="positive" showText={false} />
                <Badge sentiment="negative" showText={false} />
                <Badge sentiment="attentive" showText={false} />
                <Badge sentiment="informative" showText={false} />
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Breadcrumb</h2>
            <div className="space-y-4">
              <Breadcrumbs
                variant="title"
                items={[
                  { label: 'Home', href: '#' },
                  { label: 'Library', href: '#' },
                  { label: 'Data' },
                ]}
              />
              <Breadcrumbs
                variant="body"
                items={[
                  { label: 'Home', href: '#' },
                  { label: 'Projects', href: '#' },
                  { label: 'Sellio UI' },
                ]}
              />
              <Breadcrumbs
                variant="body"
                items={[
                  { label: 'Disabled', href: '#', disabled: true },
                  { label: 'Active', href: '#' },
                ]}
              />
            </div>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Typography</h2>
            <div className="space-y-2">
              <Text variant="large-title-1">Large Title 1</Text>
              <Text variant="large-title-2">Large Title 2</Text>
              <Text variant="large-title-3">Large Title 3</Text>
              <Text variant="title-1">Title 1</Text>
              <Text variant="title-2">Title 2</Text>
              <Text variant="title-3">Title 3</Text>
              <Text variant="subtitle-1">Subtitle 1</Text>
              <Text variant="body-1" color="muted">Body 1</Text>
              <Text variant="subtitle-2">Subtitle 2</Text>
              <Text variant="body-2" color="muted">Body 2</Text>
              <Text variant="caption-1" color="muted">Caption 1 Reg</Text>
              <Text variant="caption-1-bold">Caption 1 Bold</Text>
              <Text variant="caption-2" color="muted">Caption 2</Text>
            </div>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Input</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input placeholder="" />
                <Input placeholder="Placeholder" />
                <Input defaultValue="Value" />
              </div>
              <div className="space-y-2">
                <Input size="small" placeholder="" />
                <Input size="small" placeholder="Placeholder" />
                <Input size="small" defaultValue="Value" />
              </div>
              <div className="space-y-2">
                <Input disabled placeholder="" />
                <Input disabled placeholder="Placeholder" />
                <Input disabled defaultValue="Value" />
              </div>
              <div className="space-y-2">
                <Input size="small" disabled placeholder="" />
                <Input size="small" disabled placeholder="Placeholder" />
                <Input size="small" disabled defaultValue="Value" />
              </div>
              <div className="space-y-2">
                <Input error="Error text" placeholder="" />
                <Input error="Error text" placeholder="Placeholder" />
                <Input error="Error text" defaultValue="Value" />
              </div>
              <div className="space-y-2">
                <Input size="small" error="Error text" placeholder="" />
                <Input size="small" error="Error text" placeholder="Placeholder" />
                <Input size="small" error="Error text" defaultValue="Value" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Tabs</h2>
            <Tabs
              items={[
                { value: 'default', label: 'Default' },
                { value: 'hover', label: 'Hover' },
                { value: 'pressed', label: 'Pressed' },
              ]}
              defaultValue="default"
            />
          </div>
        </div>
      </div>
    </BasePage>
  )
}

