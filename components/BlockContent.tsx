'use client';

import { PortableText } from '@portabletext/react';
import type { PortableTextComponents } from '@portabletext/react';

const portabletextComponents: PortableTextComponents = {
  block: {
    h1: ({children}) => <h1 className="py-8 text-3xl">{children}</h1>,
    h2: ({children}) => <h2 className="py-2 text-xl">{children}</h2>,
    h3: ({children}) => <h3 className="py-1 text-lg">{children}</h3>,
    normal: ({children}) => <p className="text-base">{children}</p>
  }
}

export function Content({blocks}: any) {
  return (
    <PortableText value={blocks} components={portabletextComponents} />
  )
}