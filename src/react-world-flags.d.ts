declare module 'react-world-flags' {
    import * as React from 'react';

    interface ReactWorldFlagsProps {
        code: string;
        style?: React.CSSProperties;
        className?: string;
        height?: string;
    }

    const ReactWorldFlags: React.FC<ReactWorldFlagsProps>;

    export default ReactWorldFlags;
}