import React from 'react';
import IsoLocalizationContext from './iso-localization-context';
import useIsoLocalization from './useIsoLocalization';

const IsoLocalizationProvider = (props) => {
    const translator = useIsoLocalization(props.locales);

    return (
        <IsoLocalizationContext.Provider value={translator} >
            {props.children}
        </IsoLocalizationContext.Provider>
    );
};

module.exports = IsoLocalizationProvider;
