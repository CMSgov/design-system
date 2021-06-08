import React from 'react';
import { UsaBanner } from '@cmsgov/design-system';

function UsaBannerExample() {
    return (
        <div>
            <h2>Usa Banner Example</h2>
            <UsaBanner />
            <UsaBanner locale="es" />
        </div>
    );
}

export default UsaBannerExample;
