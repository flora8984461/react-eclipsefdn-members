# react-eclipsefdn-members

[![Build Status](https://travis-ci.org/EclipseFdn/react-eclipsefdn-members.svg?branch=master)](https://travis-ci.org/EclipseFdn/react-eclipsefdn-members)

Supported by our member organizations, the Eclipse Foundation provides our community with Intellectual Property, Mentorship, Marketing, Event and IT Services.

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Running the project in included web server

A prerequisite to running the Java web server locally is installing the external Jar dependencies for the Eclipse Foundation Java SDK. This provides bundling of common Quarkus functionality and models used in creating APIs. Eventually this will be available in a public repository, but for now it is only available in packaged jars. The jars can be installed using the below maven commands in the project root directory: 

```  
mvn install:install-file -Dfile=$(pwd)/lib/eclipsefdn-java-sdk-core-0.1-BETA.jar \
-DgroupId=org.eclipsefoundation \
-DartifactId=eclipsefdn-java-sdk-core \
-Dversion=0.1-BETA \
-Dpackaging=jar

mvn install:install-file -Dfile=$(pwd)/lib/eclipsefdn-java-sdk-persistence-deployment-0.1-BETA.jar \
-DgroupId=org.eclipsefoundation \
-DartifactId=eclipsefdn-java-sdk-persistence-deployment \
-Dversion=0.1-BETA \
-Dpackaging=jar

mvn install:install-file -Dfile=$(pwd)/lib/eclipsefdn-java-sdk-persistence-0.1-BETA.jar \
-DgroupId=org.eclipsefoundation \
-DartifactId=eclipsefdn-java-sdk-persistence \
-Dversion=0.1-BETA \
-Dpackaging=jar
```  

## Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) the [eclipsefdn/react-eclipsefdn-members](https://github.com/eclipsefdn/react-eclipsefdn-members) repository
2. Clone repository: `git clone https://github.com/[your_github_username]/react-eclipsefdn-members.git`
3. Create your feature branch: `git checkout -b my-new-feature`
4. Commit your changes: `git commit -m 'Add some feature' -s`
5. Push feature branch: `git push origin my-new-feature`
6. Submit a pull request

### Declared Project Licenses

This program and the accompanying materials are made available under the terms
of the Eclipse Public License v. 2.0 which is available at
http://www.eclipse.org/legal/epl-2.0.

SPDX-License-Identifier: EPL-2.0

## Related projects

### [EclipseFdn/solstice-assets](https://github.com/EclipseFdn/solstice-assets)

Images, less and JavaScript files for the Eclipse Foundation look and feel.

### [EclipseFdn/hugo-solstice-theme](https://github.com/EclipseFdn/hugo-solstice-theme)

Hugo theme of the Eclipse Foundation look and feel. 

## Bugs and feature requests

Have a bug or a feature request? Please search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/eclipsefdn/react-eclipsefdn-members/issues/new).


## Author

**Christopher Guindon (Eclipse Foundation)**

- <https://twitter.com/chrisguindon>
- <https://github.com/chrisguindon>

**Yi Liu (Eclipse Foundation)**

- <https://github.com/flora8984461>

## Trademarks

* Eclipse® is a Trademark of the Eclipse Foundation, Inc.
* Eclipse Foundation is a Trademark of the Eclipse Foundation, Inc.

## Copyright and license

Copyright 2020 the [Eclipse Foundation, Inc.](https://www.eclipse.org) and the [react-eclipsefdn-members authors](https://github.com/eclipsefdn/react-eclipsefdn-members/graphs/contributors). Code released under the [Eclipse Public License Version 2.0 (EPL-2.0)](https://github.com/eclipsefdn/react-eclipsefdn-members/blob/src/LICENSE).
