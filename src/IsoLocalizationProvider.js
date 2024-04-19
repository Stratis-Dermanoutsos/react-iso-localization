import React from 'react';
import IsoLocalizationContext from './iso-localization-context';
import useIsoLocalization from './useIsoLocalization';

/**
 * The props accepted by the IsoLocalizationProvider component can contain children and locales.
 * For the locales prop, an object containing the locales object for each supported language is expected.
 * 
 * @param {*} props The props accepted by the IsoLocalizationProvider component.
 * @returns 
 * @example
 * <IsoLocalizationProvider locales={{
 *    en: {
 *        hello: 'Hello'
 *    },
 *    el: {
 *        hello: 'Γεια σου'
 *    }
 * }}>
 *     <App />
 * </IsoLocalizationProvider>
 */
const IsoLocalizationProvider = (props) => {
    const translator = useIsoLocalization(props.locales);

    return (
        <IsoLocalizationContext.Provider value={translator} >
            {props.children}
        </IsoLocalizationContext.Provider>
    );
};

module.exports = IsoLocalizationProvider;
