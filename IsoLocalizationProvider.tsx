import IsoLocalizationContext from './iso-localization-context';
import useIsoLocalization from './useIsoLocalization';
import IsoLocalizationDictionary from './iso-localization-dictionary';

const IsoLocalizationProvider = (props: React.PropsWithChildren<{ locales: IsoLocalizationDictionary }>): JSX.Element => {
    const translator = useIsoLocalization(props.locales);

    return (
        <IsoLocalizationContext.Provider value={translator} >
            {props.children}
        </IsoLocalizationContext.Provider>
    );
};

export default IsoLocalizationProvider;