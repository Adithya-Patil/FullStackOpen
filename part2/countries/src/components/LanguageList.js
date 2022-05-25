const LanguageList = (languages) => {

    let langArr = [];
    for (const key in languages.languages) {
        langArr = langArr.concat(languages.languages[key]);
    }

    return(
        <ul>
            {langArr.map(lang => <li key={lang}>{lang}</li>)}
        </ul>
    );
}

export default LanguageList;