Develop
This section covers:
1. A tutorial that guides you through using and creating Midnight's smart contracts on Midnight devnet, including information about how to download and install everything you need to be a Midnight DApp developer.
2. How it works explainers – information about what happens 'behind the scenes' in Midnight, including more detailed information about how contracts are executed.
3. Midnight reference documentation, including the Compact language details, Midnight APIs, and tools.
4. Release notes.
5. Information about how to contact Midnight's developer relations team for help or to report problems.
Before accessing or using Midnight devnet, you must read and agree to the Midnight devnet terms of service ('Terms').
BY ACCESSING OR USING MIDNIGHT DEVNET OR ANY OF THE RELATED SOFTWARE/TOOLS, YOU AGREE TO THE TERMS. IF YOU DO NOT ACCEPT THE TERMS, OR DO NOT HAVE THE AUTHORITY TO ENTER INTO THE TERMS, PLEASE DO NOT ACCESS MIDNIGHT DEVNET.
________________
Midnight developer tutorial
The purpose of this tutorial is to introduce you to the experience of using and creating Midnight decentralized applications (DApps).
All the content on this site is specific to Midnight devnet. Both the documentation and the Midnight network itself are subject to change prior to any wider public release.
important
Devnet is a sandboxed development environment, so there are NO guarantees that the environment will persist data.
Audience​
This tutorial is about being a Midnight DApp developer, who creates Midnight DApps. Midnight DApp users will not need to know anything about how to author smart contracts or how to write DApp software.
The tutorial assumes you want to test drive the Midnight developer experience without reconfiguring your own computer as a Midnight developer system. Therefore, Midnight provides directory-local configuration files and Docker images that should minimize the changes to your system. If you don't already have Docker installed on your system, the tutorial will point you in the right direction to get it.
Midnight contracts are described in their own domain-specific language, but Midnight DApps are written in TypeScript (or JavaScript). This tutorial does not assume you are a TypeScript programmer, but it does assume:
* You are willing to read some TypeScript code.
* You are familiar with using a text editor to edit code.
* You are comfortable interacting with your system in a terminal window, typing (and pasting in) commands at a shell prompt.
If those assumptions do not describe you, you might like to review the learn section to explore the features and benefits Midnight provides without getting into the technical details of coding.
________________


Part 1: using Midnight
In this first part of the Midnight developer tutorial, you will:
1. Learn to install and configure the components needed to connect to the Midnight network
2. Acquire some tDUST to pay for transactions on the network
3. Run a DApp that connects to the network and performs a transaction.
When you are done with part 1, you will have connected to the Midnight network and made real changes to the Testnet blockchain ledger.
Remember, if you run into any problems, ask for help using the pathways described in the getting help section.
Prerequisites for part 1
In part 1 of the tutorial, you will not yet install everything needed to be a Midnight developer. Instead, at this point, you will install what is needed to be a Midnight user. Each part of the tutorial begins by guiding you to satisfy the prerequisites for that part, assuming you have already completed the preceding parts.
Supported platforms​
These instructions have been tested on recent versions of macOS and various Linux distributions. Development on Windows has been tested using the Windows Subsystem for Linux (WSL), specifically Ubuntu 22.04.2 LTS (GNU/Linux 5.15.90.1-microsoft-standard-WSL2 x86_64).
Docker​
If you do not already have Docker installed and working on your system, you will need to do that before continuing with this tutorial. The easiest and recommended installation is Docker Desktop. Find the installation instructions on the Docker website.
Check that you can invoke Docker. If you type the following at a shell prompt, you should see a recent version number, such as 24.0.5.
docker --version
List available images from Midnight docker repository.
docker search midnightnetwork
If you cannot complete this step, contact the Midnight DevRel team, as described in the getting help section.
Midnight Lace wallet - alpha version for testnet
There is a Midnight-enabled edition of the Lace wallet. The Midnight Lace wallet is an alpha version specifically for the testnet, functioning as a Chrome extension.
caution
If you have a devnet version of the Midnight Lace wallet installed (version <= 1.1.5), you must uninstall it before installing the testnet version (version >= 1.2.2). The TestNet version of Midnight Lace wallet is not compatible with the testnet version.
Chrome browser
You must use the Chrome web browser or its derivatives to complete web-based transactions on the Midnight testnet.
Only the Chrome browser itself is fully supported. The Midnight Lace wallet may not be able to connect to your local proof server from Chrome derivatives. If you choose to use Brave, for example, it will be necessary to disable Brave shields when running this tutorial's welcome DApp, so that the DApp (hosted at one address) can contact your local proof server (hosted on your system, at a different address) through the Midnight Lace extension.
Supported Chromium version: 119 or later.
Install Midnight Lace (alpha)​
1. Go to the Midnight testnet releases page.
2. Select wallet, then select midnight-lace-x.y.z (where x.y.z is the version).
3. Click on the ZIP file with a name like midnight-lace-x.y.z.zip to download it.
4. Unzip the file.
5. In your Google Chrome (or derived) web browser, go to Settings > Extensions. If necessary, go to Manage Extensions, so that you see a toggle-switch for Developer mode. Enable developer mode.
6. Additional buttons should appear above your extensions, including the one labeled Load unpacked.
7. Click the Load unpacked button and select the folder that was created when you unzipped the Midnight Lace ZIP file.
The extension tile in your browser's list of installed extensions may show the existence of some error messages about being unable to connect to the standard set of servers. You may safely ignore these errors.
You may want to go to the Midnight Lace extension's detailed settings and enable the toggle-switch labeled Pin to toolbar, so that the wallet is easily accessible.
Set up Midnight Lace (alpha)​
1. Start the extension, either by clicking its icon on the web browser's toolbar (if you pinned it there after the preceding steps) or by clicking on it in the list of extensions under the extensions icon in your browser's toolbar.
2. The first page you see presents the options of creating a new wallet or restoring an existing one.  new Midnight Lace wallet  At this point, create a new wallet.
3. Read and accept the 'Lace Terms of Use'.  Lace Terms of Use 
4. Give your wallet a name to help you identify it later, maybe a name like Midnight testnet.  Lace wallet name 
5. Choose and save a strong password for your wallet. Please make sure to keep your password in a safe place. No one will have access to or the ability to retrieve or recover your password. If you lose your password, you will need to restore your wallet with your secret passphrase.
6. In the next step, the wallet asks for the network addresses and ports of the three client service components it needs:
   * the Midnight network you are going to connect to. If you're connecting to our testnet, choose the "Testnet" option. If you're running a local version of midnight testnet, choose the "Undeployed" option.
   * the Midnight network node through which transactions are to be submitted
   * the publish-subscribe (pub-sub) indexer of the blockchain, which transmits ledger updates to the wallet
   * the proof server, which generates zero-knowledge proofs of the validity of your Midnight transactions
   7.  Lace server configuration important
Notice that the default proof server address points to a local instance that you have installed. This is because the proof server requires private data as inputs, and using a remote instance could compromise users' private data.
      7. Finally, fill in all the words for a secret passphrase, which may be needed to restore your wallet in the future. Do not lose this passphrase! Please write down and keep your passphrase in a safe place. No one will have access to or the ability to retrieve or recover your passphrase. If you lose your passphrase, you will not be able to restore your wallet.  Lace secret passphrase 
      8. After you have verified your passphrase, a page confirming that you have completed the setup is displayed.  Lace setup complete 
Then the main page for your new wallet appears, with 0.00 tDUST as its initial balance. You can access this view at any time by clicking on the Midnight Lace extension icon again.
Before your wallet has received any tDUST, the main page displays the wallet address, so that you can copy it into some place that will transfer funds to the wallet. Visit the token acquisition page to find out more. Later, you can access the wallet address at any time by clicking on the Receive button at the top of the page.  Lace receive 
Token acquisition
In the production Midnight network, anyone running a DApp would need to hold some Dust in a persistent wallet and spend some of it on each transaction. On the testnet, however, a supply of free tDUST is available for developers who want to experiment with Midnight DApps.
Get some tDUST​
         1. Copy your receiving address from your Midnight Lace wallet.
         2. Visit the Midnight testnet faucet 🚰 and enter your wallet address.
         3. Select 'Request tokens'. This may take a few seconds to process and will return something like:
Transaction submitted. Its ID is 1644b988ac71dc6bd6...
         4. You should have received 1000.0 tDUST from the faucet.
Proof server
Midnight uses zero-knowledge (ZK) cryptography to enable shielded transactions and data protection. An essential element of this architecture is ZK functionality provided by a Midnight proof server, which generates proofs locally that will be verified on-chain. The information that a DApp sends to the proof server includes private data, such as details of token ownership or a DApp's private state. To protect your data, you should access only a local proof server, or perhaps one on a remote machine that you control, over an encrypted channel.
In this section of the tutorial, you will install and run a Midnight proof server on your system in a Docker container. The Midnight Lace Chrome extension (including the wallet) communicates with the proof server to invoke ZK functionality and generate ZK proofs for your transactions.
Install the proof server​
In the prerequisites for this part of the tutorial, you installed Docker and verified your access to the Midnight Testnet docker repo.
docker search midnightnetwork
To download the Docker image for the Midnight proof server, run the following command:
docker pull midnightnetwork/proof-server:latest
tip
By the way, you may not have noticed, but if you hover your mouse pointer over any of the shell commands or code example boxes in this tutorial, a copy icon (it looks like two overlapping sheets of paper) appears at the right-hand side of the box. Click that to copy the contents of the box.
You can verify the download's success by checking that the following command lists a proof server image:
docker images | grep proof-server
Start the proof server​
Run the proof server with the following command:
docker run -p 6300:6300 midnightnetwork/proof-server -- 'midnight-proof-server --network testnet'
You should see some output indicating that the server has started.
Stop the proof server​
To stop the proof server, simply exit the process you launched with docker run. For example, on most systems, you can type Ctrl-C to stop the process.
For the next step in this tutorial, the proof server must be running, so if you have stopped it, start it again now.
Your privacy​
The proof server exists to protect your privacy. It does not open any network connections; it simply listens on its assigned port for requests from your Chrome extension. One of the lines of output you may see from the proof server includes this text:
Targeting network: TestNet
This indicates that the instance you are running is configured appropriately to generate proofs that are valid on the Midnight Testnet. It does not indicate a network connection from the proof server to Testnet.
Please let the DevRel support team know if you have any privacy concerns regarding the proof server.
Optionally for Linux users: Setup proof-server as a systemd service​
For added convenience, you may consider running the proof-server as an automatic background process anytime you boot your machine.
         1. Create a new file for your systemd service, typically in the /etc/systemd/system/ directory. For example:
sudo nano /etc/systemd/system/midnight-proof-server.service
         2. Add the following contents.
[Unit]
Description=Midnight Network Proof Server
After=docker.service
Requires=docker.service


[Service]
ExecStart=/usr/bin/docker run -p 6300:6300 midnightnetwork/proof-server -- 'midnight-proof-server --network testnet-02'
Restart=always
RestartSec=5


[Install]
WantedBy=default.target
Adjust the Description, ExecStart, and other parameters as needed.
         3. Reload systemd manager to apply changes.
sudo systemctl daemon-reload
         4. Start service.
sudo systemctl start midnight-proof-server # start service
         5. How to stop and get status of service.
sudo systemctl enable midnight-proof-server # stop service


sudo systemctl status midnight-proof-server # get status of service
Welcome to the Midnight Testnet
By now you have:
         * A Midnight Lace wallet (alpha)
         * Some amount of tDUST assigned to that wallet, and
         * A proof server running locally.
You are ready to perform your first transaction on the Midnight Testnet.
         1. Copy your best friend's receiving address or the address below and send exactly 1.0 tDUST.
6e20afe9898f5b963cfe1372378880f6a4aa36748f7969ef69192ba0c60cf329|0300f3fe71b72710525c847f37d85453061e5accdddca2922a609730e6b02dd8cf30a2f851aa817dcd65a8286d32fed22617c647af2e1dfbce98
✨ At this point you've completed your first Midnight Testnet transaction. Now, let's build some DApps!
Part 2: building a DApp
In this second part of the Midnight developer tutorial, you will:
         1. Learn to install the tools necessary to compile a Midnight contract and DApp from source code
         2. Download the example code needed for the remainder of the tutorial
         3. Build a simple example from source
         4. Run the example and deploy your own smart contract
         5. Learn to install and run your own Midnight network node and its associated pub-sub indexer, rather than relying on a node in the cloud.
important
When going through the tutorial, make sure you use compatible versions of example code and Compact compiler shown in the table below.
Examples
	Compactc
	0.1.17
	0.21.0
	0.1.16
	0.20.0
	0.1.15
	0.19.0
	0.1.14
	0.18.2
	The last sections of part 2 of the tutorial examine the Compact code for the example contract and the TypeScript code for the example DApp in more detail.
When you are done with part 2, you will have built a DApp from source, deployed a contract, and run your own non-voting Midnight node, connected to the Midnight network.
The example contract in the DApp in part 2 is very simple: it merely creates a counter on the ledger and provides a circuit to increment it. The contract does not enforce any constraints beyond those implied by the Counter type itself, and the DApp does not work with any interesting private data. Thus, it does not show off Midnight's capability to shield private data, but when you are done with part 2, you will have built a DApp from source and deployed a new contract on the Midnight network.
Prerequisites for part 2
In part 1 of the tutorial, you installed only the tools needed to use Midnight, not the ones needed to be a Midnight developer. In this part of the tutorial, you will install and configure the tools needed to build Midnight DApps.
info
If you are already an experienced JavaScript or TypeScript developer, you are likely to have NVM and Yarn installed already. In that case, you should read over the following steps and perform only the parts that are relevant to configure the tools for Midnight development.
Node​
Many Midnight Testnet features are provided as TypeScript packages, including the Midnight example applications and Midnight APIs. The Node Version Manager (NVM) is the best way to install the Node.js versions that these repositories require. Installation and troubleshooting instructions for NVM can be found on the NVM GitHub site. (If you are installing on macOS using Homebrew, please pay attention to Homebrew's necessary additions to your shell profile.)
After following the NVM installation instructions, verify that NVM is installed:
nvm --version
You should see a version number printed, such as 0.39.5.
Install LTS version of Node 18x or greater:
nvm install 18 --lts
Midnight Compact compiler​
Download the Compact compiler from the Midnight Testnet releases repository, choosing either the Linux or macOS package. The file is named compactc-<platform>.zip.
Create a directory in which to place the compiler and its supporting binaries, and unzip the file inside that directory. For example:
mkdir ~/my-binaries/compactc
cd ~/my-binaries/compactc
unzip ~/Downloads/compactc-<platform>.zip
Under macOS, it is necessary to add the executables compactc.bin and zkir to your authorized applications set. You can do this as follows:
         1. In your terminal, run compactc.bin. MacOS will warn you that it cannot be opened because 'the developer cannot be verified'. Click the Cancel button in this dialog.
         2. Now open your System settings and navigate to Privacy & Security.
         3. Scroll down near the bottom, and you should see "compactc.bin" is blocked from use because it is not from an identified developer, with a button that says Allow Anyway. Click that button.
         4. Repeat for zkir.
On Linux, or Windows with WSL, the unzipped compiler should already be executable, but if you run into problems, check that compactc.bin, zkir, and compactc are executable, or run chmod +x compactc.bin zkir compactc in the unzipped Compact compiler directory.
While still in the directory where you unzipped the compiler, you can check that it runs with the command:
./compactc --version
You should see a version number printed, such as 0.8.11. On MacOS, the first time you run compactc you will be warned that it cannot be opened because 'the identity of the developer cannot be confirmed'. Click the Open button in this dialog and you can continue.
The Midnight example DApps use the shell environment variable COMPACT_HOME to locate the Compact compiler. You may want to add this to your shell profile. For example:
export COMPACT_HOME='<absolute path to compactc directory>'
You may also want to add the directory to your PATH environment.
Running Midnight Compact compiler​
In order to run Midnight Compact compiler, add the directory where the compiler is to your $PATH environment, reload your shell config file and check if Midnight Compact compiler runs with the command:
compactc --version
Optional: Visual Studio Code (VSCode) extension for Compact​
You can use any editor you like to create Midnight DApps. Midnight provides an extension for VSCode, specifically for creating and editing Midnight contracts, which are written in the Compact DSL. In addition to syntax highlighting, the extension does some live, dynamic checking of your contracts as you type, and it can help with debugging. It even provides templates to help you get started with new contracts or parts of them. Even if VSCode is not your primary editor, you may want to use the VSC Compact extension to edit Midnight contracts, at least while you are learning the language.
You can download the VSCode extension for Compact from the Midnight Testnet releases repository, where it will have a file name like compact-x.y.z.vsix for some version x.y.z.
To install the plugin in VSCode:
         * Open the Extensions pane in VSCode
         * Click the ... symbol at the top of the Extensions pane
         * Select 'Install from VSIX...'
         * Locate the file you just downloaded.
VSCode can usually use newly installed plugins immediately, but sometimes it prompts you to restart for the changes to take effect.
Midnight examples archive
Download the Midnight example DApps archive from the Midnight Testnet releases repository.
The examples ZIP file is named midnight-examples-x.y.z.zip (where x.y.z is the version) for some version x.y.z. Unzip the file wherever you would like to build and test Midnight DApps. Then go to the top level of the newly unzipped package.
unzip midnight-examples-0.1.17.zip
cd midnight-examples-0.1.17
Configure NVM for the examples​
In the Midnight examples directory, there is a file .nvmrc which will configure NVM correctly for the purposes of this tutorial. Verify that your current directory is the midnight-examples-x.y.z directory, and run the following command:
nvm install
You should see output that begins with a line like this:
Found <somewhere>/midnight-examples-0.1.17/.nvmrc' with version <lts/hydrogen>
and includes a line like this near the end:
Now using node v18.19.1 (npm v10.2.4)
Configure Yarn to download Midnight libraries​
You will be using Yarn to build Midnight example DApps. An easy way to install Yarn, now that you have Node configured, is with the corepack command:
corepack enable
This succeeds silently, but you should see version information now if you type:
yarn --version
You should see a version number printed, such as 4.1.0.
The best way to verify this step is to use Yarn to pull the Midnight examples dependencies. In the top level of your midnight-examples folder, simply invoke Yarn with no parameters:
yarn
You should see a lot of output, but no errors, although there may be some warnings. For example, the last line of output may say Done with warnings.
Configure the Compact compiler path​
If you did not add COMPACT_HOME to your shell profile after installing the compiler, or if you have not restarted your shell since then, execute the following command:
export COMPACT_HOME='<absolute path to compactc directory>'
Build the counter DApp
The focus of part 2 of this tutorial is on using the tools that a developer needs to create Midnight DApps. To that end, the example uses an extremely simple contract, which simply defines a counter and a circuit to implement it. To keep the code short enough to read easily, the counter DApp uses a text-based user interface, omitting the additional complexities of a web interface. Later parts of the tutorial will guide you through the creation of web-based DApps.
Starting with your current directory as the top-level Midnight examples directory (such as midnight-examples-0.1.3), go to the counter DApp example:
cd examples/counter
Notice that counter contains two sub-directories, each of which is a separately buildable project.
         * contract - contains the Compact source for the counter contract, plus a tiny amount of associated TypeScript
         * counter-cli - contains the command-line interface of the DApp and depends on the contract code.
Compile the code​
Build both sub-projects at once by running the following command in the counter directory above the two sub-directories:
npx turbo build
Successful output looks like this:
Tasks:    4 successful, 4 total
Cached:    0 cached, 4 total
 Time:    8.49s
If you see this sort of output, you have compiled a Midnight DApp, and you are ready to run it.
Run the counter DApp
Now you are ready to run the counter DApp, deploying a new instance of its contract to the Midnight Testnet and submitting transactions to the network.
A command-line wallet​
Because this DApp has no web-based user interface and runs outside of your web browser, it cannot access the Midnight Lace wallet that you installed in part 1 of the tutorial. Instead, the DApp initializes a Midnight wallet that shares its core libraries with Lace wallet, but which can be invoked through library calls in command-line applications. (Many programmers refer to the software without a graphical user interface as 'headless', so you may find text elsewhere that refers to this wallet as the 'headless wallet'.)
When you run the DApp, the first thing it will do is instantiate its wallet, either by creating a completely fresh one or by rebuilding the wallet from a previously generated seed. On the first run, you must create a fresh one and transfer some tDUST to it from your Midnight Lace wallet. The instructions below guide you through the process.
Run the counter CLI​
         1. Be sure the proof server that you installed in part 1 of the tutorial is started.
         2. In the counter/counter-cli folder, launch the DApp with:
yarn testnet-remote
         3. This starts the DApp in a configuration that uses your local proof server, but connects to cloud-deployed instances of a Midnight node and a pub-sub indexer, just as in part 1 of this tutorial.
         4. Choose to build a fresh wallet. The DApp will display the wallet's address and a balance of 0 tokens.
The seed for the freshly created wallet will also be printed. Save this information so that you can reuse this wallet on a later run of the counter DApp.
Additionally, your interactions with the DApp, including the wallet address and seed, are stored in a log subdirectory of counter-cli.
         5. Transfer tokens from your Lace wallet to your CLI wallet:
            * Copy your new wallet's address and open the Midnight Lace wallet in your web browser by clicking its icon on the Chrome toolbar.
            * Select Send and paste the CLI wallet address into the 'recipient's address' field.
            * Enter an amount to transfer. The value of 10 tDUST will be more than enough.
            * Review and click Send.
            * Enter your wallet password and click Confirm.
            6. Return to the counter DApp's window and wait for the tokens to be received. The DApp detects the funds that were transferred to your CLI wallet and reports your new wallet balance, followed by a new prompt.
            7. The next prompt asks whether you want to deploy a new counter contract on Testnet or join an existing one. Choose to deploy your newly-compiled contract.
The DApp prints the deployed contract's address. Save this information, so that you can run the DApp again later and rejoin the contract.
            8. Interact with the contract. You are prompted with three options: increment, display, or exit.
               * First, display the current value by selecting option 2. This retrieves the current state of the contract from the blockchain ledger. It should report a value of 0.
               * Next, increment the counter by selecting option 1. This submits a new transaction and awaits confirmation.
If you watch your proof server's output in another window at the same time, you will see that it generates a proof for the transaction, which is submitted to Testnet.
Generating the proof, submitting it to Testnet, and waiting for the transaction to be processed by the network takes some time. Eventually, the DApp should report the successful completion of the transaction, with output like:
Transaction <transaction hash> added in block <block number>
                  * Now verify that the counter's value has been incremented by selecting option 2. It should report a new value of 1.
                  * Repeat as you like, and then select (3) to exit. There is a problem in one of the underlying libraries that can cause error messages upon exit. You may safely ignore these.
                  9. Try running the DApp again, rebuilding the wallet from the saved seed, and rejoining the existing contract. Have fun playing and experimenting.
🎉 Congratulations, you are now building and deploying DApps on the Midnight Testnet.
In detail: the counter contract
The remainder of this part of the tutorial examines first the Compact contract and then the TypeScript code for the counter DApp.
The contract behind the counter DApp can be found within the Midnight examples directory at:
examples/counter/contract/src/counter.compact
If you have installed the Visual Studio Code extension for Compact, you might want to open the preceding file in VS Code to follow along.
The counter contract itself is very simple. Here are the entire contents of counter.compact:
pragma language_version >= 0.14.0;


import CompactStandardLibrary;


// public state
export ledger round: Counter;


// transition function changing public state
export circuit increment(): [] {
 round.increment(1);
}
To make sense of this Compact code, start in the middle, with the ledger field declaration. It says that the public state of the contract, visible on the Midnight blockchain, includes a field round. The Midnight ledger supports Counter as one of its state types, and the field is declared to be of that type.
In addition to declaring ledger fields, a contract can declare the functions that provide the interface to its private state, each marked with the witness keyword. The counter contract has no support for such hidden, off-chain state, so no witnesses are mentioned.
This contract provides a single public operation (circuit) that its users can call: increment. The increment operation simply increments the value of the round counter by 1.
There are two other lines of code in this contract, at the top of the file. The first line is a pragma that specifies a constraint on the Compact language version. If the Compact compiler does not support the language versions specified, it will signal a compile-time error. The second is the import that makes Compact's standard library (CompactStandardLibrary) available in this file. The standard library includes the ledger type Counter and so it has to be imported to make that type available.
More interesting contracts can declare enumerations and structured types to be used in the ledger, multiple circuits (including unexported ones called only by other circuits in the contract), and the functions that manipulate private, off-chain state. You will learn much more about Midnight contracts in the next major section of this tutorial: the bulletin board example.
In detail: the counter DApp
The counter DApp is written in TypeScript. This page of the tutorial is intended to serve as a guide to help you find your way around the code, not reviewing every line, but looking at the 'big pieces' and the most interesting parts. You can follow along in your own copy of the code.
Project structure​
You may find it useful to split DApps into several sub-projects. This is especially true for larger, more complex DApps with web-based user interfaces, where it is desirable to test the core logic independently from the user experience. Even for a DApp as simple as the counter, however, you will see that the code is split into two sub-projects:
                  * contract - This sub-project contains the contract itself, plus supporting code to define the implementation of the local private state and code to test the contract's logic.
                  * counter-cli - This sub-project defines the command-line interface of the DApp. It depends on the outputs of the contract sub-project.
You will find project definition and configuration files in each sub-project's top level directory, while the source code is in its src subdirectory.
The contract sub-project​
The preceding page already gave you a tour of the contract itself. Because the contract is so simple, there is very little additional code to be written.
Witness implementation​
Look in the file contract/src/witnesses.ts. As the preceding page discussed, the counter contract defines no private state and therefore requires no witness functions to be defined. In the TypeScript representation of contracts, however, every contract is parameterized over its private state, so there remains a need to define some private state object for the contract. In this case, we use the type Record<string, never> to represent the type of an empty object. The definitions in counter's witnesses.ts therefore provide the minimal (empty) implementations of witnesses possible.
export type CounterPrivateState = Record<string, never>;


export const witnesses = {};
Part 3 of the Midnight tutorial introduces an example that follows the same structure, but with more interesting contents in its witnesses.ts.
Generated source​
The file contract/src/index.ts merely re-exports the definitions from the other files in the contract sub-project. Which definitions? The empty definitions of the witnesses, of course, but also the definitions generated by the Compact compiler.
If you are following the steps of this tutorial in order, then you have already built the counter project. That means you have already run the Compact compiler on counter.compact.
Look in the managed/counter subdirectory of the contract sub-project. In it, you see four directories:
                  * contract - contains files defining the TypeScript/JavaScript API for the contract
                  * zkir - contains the intermediate representations for the circuits defined in the contract
                  * keys - contains the prover and verifier keys for each circuit defined in the contract
                  * compiler - contains metadata about the contract, including the names of exported circuits and their argument and return types in JSON format
The counter contract defines only one circuit, increment, so there is a single pair of prover and verifier key for increment in keys. The zkir directory contains two files, increment.bzkir and increment.zkir. Respectively, these files are the binary and JSON representations of the ZKIR of the increment circuit.
Most of this generated content is not useful to examine, but you might want to look at managed/counter/contract/index.d.ts. You will see that it defines various types and functions that correspond directly to the code in counter.compact. For example:
                  * The Circuits type for this contract includes an increment function.
                  * The Ledger type for this contract includes a round field, declared to be a JavaScript bigint.
                  * The Witnesses type for this contract is empty, because the contract declares no witnesses.
Notice that many of the types are parameterized over some type T, representing the DApp's private state implementation, which is opaque to the circuits and ledger types emitted by the compiler.
Tests​
Part 3 of the Midnight tutorial explores unit testing, so it will not be discussed here, but you are free to examine the code in the contract/src/test subdirectory. It defines just a few Jest tests to exercise the contract in a simulation environment.
The counter-cli subproject​
All the interactive logic for the counter DApp's command-line interface is exposed through counter-cli/src/index.ts. Before examining that file, though, it may be useful to see how the whole DApp is launched.
Different configurations​
There are four 'entry-point' files in the directory:
                  * testnet-remote.ts - the first way you ran the counter DApp, so that it uses a local proof server, but a remote Midnight node and a remote pub-sub indexer, both connected to TestNet
                  * testnet-local.ts - the second way you ran the counter DApp, if you tried the optional step of running your own TestNet node and indexer
                  * testnet-remote-start-proof-server.ts - the same configuration as testnet-remote.ts, but not assuming you already have a proof server running and instead starting one as part of the script
                  * standalone.ts - invokes a DockerComposeEnvironment that launches a proof server, Midnight node, and pub-sub indexer, all disconnected from TestNet and running entirely locally, for unit testing.
If you look in testnet-remote.ts, you will see that it is very short:
const config = new TestnetRemoteConfig();
const logger = await createLogger(config.logDir);
await run(config, logger);
and the other entry points are similar, because they rely on the configurations defined in config.ts. Each of those configurations is quite similar. For example, here is the one that says to connect to the Midnight-hosted instances of a Midnight node and an indexer:
export class TestnetRemoteConfig implements Config {
 logDir = path.resolve(currentDir, '..', 'logs', 'testnet-remote', `${new Date().toISOString()}.log`);
 indexer = 'https://indexer.testnet-02.midnight.network/api/v1/graphql';
 indexerWS = 'wss://indexer.testnet-02.midnight.network/api/v1/graphql/ws';
 node = 'https://rpc.testnet-02.midnight.network';
 proofServer = 'http://127.0.0.1:6300';
 constructor() {
   setNetworkId(NetworkId.TestNet);
 }
}
The various subsystems are all configured for operation on Midnight TestNet.
Notice the setNetworkId call in the TestnetRemoteConfig constructor. Many Midnight APIs and packages require the API consumer to explicitly specify the network they are targeting via a network ID parameter. Providing such a parameter to each API would be tedious and error-prone. Midnight.js provides the setNetworkId function so that the user can specify the network they are targeting once and have the correct network ID used everywhere.
Generated types, instantiated​
Recall that many of the types, such as Contract, in the source files generated by the Compact compiler, are parameterized. Writing out the instantiated forms of these types can become unwieldy, especially when the type arguments will be the same, over and over. Thus, the Midnight team often creates a short file defining instantiated versions of some of these generated types and uses those instantiated versions in the rest of the code.
You can see an example of this pattern in the file common-types.ts, which defines types such as CounterContract, like this:
export type CounterContract = Contract<CounterPrivateState, Witnesses<CounterPrivateState>>;
The Dapp​
The two main files implementing our application are counter-cli/src/cli.ts and counter-cli/src/api.ts. The former contains the main run loop of the application. The latter contains convenience functions for interacting with the Midnight network.
To understand counter-cli/src/cli.ts, start at the end, looking at the run function. Ignoring the startup and error-handling code, the core actions of the DApp are to
                  1. instantiate a wallet,
                  2. instantiate a collection of 'providers' for working with the contract, and
                  3. start the main user interaction loop.
Creating a wallet​
If this DApp were running in a web browser, it would begin by connecting to the browser's Midnight Lace wallet extension. Instead, the counter DApp is running outside any web browser, so it initializes a 'headless' wallet to be used for funding transactions.
Depending on the user's input in the interactive buildWallet function, the DApp either prompts for a wallet seed or generates some random bytes to serve as the seed. Either way, the flow eventually reaches buildWalletAndWaitForFunds in counter-cli/src/api.ts. Omitting the logging code, this function is as follows:
export const buildWalletAndWaitForFunds = async (
 { indexer, indexerWS, node, proofServer }: Config,
 seed: string,
): Promise<Wallet & Resource> => {
 const wallet = await WalletBuilder.buildFromSeed(
   indexer,
   indexerWS,
   proofServer,
   node,
   seed,
   getZswapNetworkId(),
   'warn',
 );
 wallet.start();
 const state = await Rx.firstValueFrom(wallet.state());
 let balance = state.balances[nativeToken()];
 if (balance === undefined || balance === 0n) {
   balance = await waitForFunds(wallet);
 }
 return wallet;
};
The WalletBuilder class provides the main entry point into creating a wallet: buildFromSeed. The wallet needs to know about the indexer, the node, and the proof server, because it watches the ledger for information about funds and transaction results (using the indexer), submits transactions through the node, and calls on the proof server to generate proofs that transactions are valid.
Notice the getZswapNetworkId argument to WalletBuilder.buildFromSeed. The getZswapNetworkId function is provided by Midnight.js. It retrieves the current network ID (set by the setNetworkId call we have already seen) and converts it to a format the wallet can understand.
After the wallet is started, the DApp pauses to wait for funds to appear. You may find it instructive to look at the definition of waitForFunds just above buildWalletAndWaitForFunds in the file. The wallet's state appears in TypeScript as an observable stream, so waitForFunds uses RxJS functions to watch for the wallet's balance to be non-zero.
export const waitForFunds = (wallet: Wallet) =>
 Rx.firstValueFrom(
   wallet.state().pipe(
     Rx.throttleTime(10_000),
     Rx.tap((state) => {
       const scanned = state.syncProgress?.synced ?? 0n;
       const total = state.syncProgress?.total.toString() ?? 'unknown number';
     }),
     Rx.filter((state) => {
       // Let's allow progress only if wallet is close enough
       const synced = state.syncProgress?.synced ?? 0n;
       const total = state.syncProgress?.total ?? 1_000n;
       return total - synced < 100n;
     }),
     Rx.map((s) => s.balances[nativeToken()] ?? 0n),
     Rx.filter((balance) => balance > 0n),
   ),
 );
Notice that the wallet's state includes information about the degree to which it is synchronized with the total state of the blockchain.
Hypothetically, the wallet could track the balances of many different tokens, so the code in waitForFunds asks specifically for the nativeToken balance, meaning tDUST. Once the tDUST balance is non-zero, the waitForFunds function returns, and the buildWalletAndWaitForFunds function returns the wallet itself.
Providers​
The Midnight programmatic interface to a smart contract is extremely flexible and thus highly parameterized. For example, a DApp developer might implement a new kind of private state storage or interpose some kind of balance-checking functionality between the contract and a wallet. The way that the Midnight libraries handle all this functional parameterization is through a JavaScript object with fields for different types of providers.
Of course, most of the time, a standard implementation for each type of provider is what you want, and the Midnight libraries define these for you. All you have to specify is some information about where to find the indexer, the proof server, and so on.
The counter-cli/src/api.ts file defines a function configureProviders that returns an object containing the providers our application will need to interact with the network.
export const configureProviders = async (wallet: Wallet & Resource, config: Config) => {
 const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
 return {
   privateStateProvider: levelPrivateStateProvider<PrivateStates>({
     privateStateStoreName: contractConfig.privateStateStoreName,
   }),
   publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
   zkConfigProvider: new NodeZkConfigProvider<'increment'>(contractConfig.zkConfigPath),
   proofProvider: httpClientProofProvider(config.proofServer),
   walletProvider: walletAndMidnightProvider,
   midnightProvider: walletAndMidnightProvider,
 };
};
Back in the run function, you can see where the counter DApp creates the providers.
const providers = await api.configureProviders(wallet, config);
The exception to the pattern of using standard implementations for the providers is seen in the value provided for the walletProvider and midnightProvider fields.
                  * The wallet provider specifies the wallet's public key and defines a function for balancing transactions (that is, attaching to the transaction an appropriate amount of 'fuel' to run the transaction): balanceTx.
                  * The Midnight provider defines a function for submitting transactions to the Midnight network: submitTx.
The counter DApp defines a single object to satisfy both provider interfaces:
const createWalletAndMidnightProvider = async (wallet: Wallet): Promise<WalletProvider & MidnightProvider> => {
 const state = await Rx.firstValueFrom(wallet.state());
 return {
   coinPublicKey: state.coinPublicKey,
   balanceTx(tx: UnbalancedTransaction, newCoins: CoinInfo[]): Promise<BalancedTransaction> {
     return wallet
       .balanceTransaction(
         ZswapTransaction.deserialize(tx.serialize(getLedgerNetworkId()), getZswapNetworkId()),
         newCoins,
       )
       .then((tx) => wallet.proveTransaction(tx))
       .then((zswapTx) => Transaction.deserialize(zswapTx.serialize(getZswapNetworkId()), getLedgerNetworkId()))
       .then(createBalancedTx);
   },
   submitTx(tx: BalancedTransaction): Promise<TransactionId> {
     return wallet.submitTransaction(
       ZswapTransaction.deserialize(tx.serialize(getLedgerNetworkId()), getZswapNetworkId()),
     );
   },
 };
};
You can read more about what happens when a transaction is balanced and submitted to the network in the portion of the Midnight developer documentation that describes how Midnight works.
Working with a contract​
The bulk of the counter DApp uses input from the user to direct its actions, which include:
                  * deploying a new counter contract
                  * joining an existing counter contract
                  * calling the increment circuit on the contract
                  * examining the ledger state associated with the contract.
With the wallet and providers objects in hand, these actions are performed by calling Midnight library functions. For example, the call to find and join an existing contract can be seen in the join function, near the top of `counter-cli/src/api.ts. The relevant call is:
const counterContract = await findDeployedContract(providers, {
 contractAddress,
 contract: counterContractInstance,
 privateStateKey: 'counterPrivateState',
 initialPrivateState: {},
});
where counterContractInstance is simply a Contract object defined in the index.ts file in the generated code.
export const counterContractInstance: CounterContract = new Contract(witnesses);
Submitting a Transaction​
Using the generated code and the Midnight.js library, creating and submitting an increment transaction becomes a simple function call:
const tx = await counterContract.callTx.increment();
The callTx access on the counterContract object indicates that we want to create a call transaction for the counter contract. The increment() call creates and submits a call transaction for the increment circuit. After the transaction is submitted and included in the blockchain, tx contains additional information about the transaction. For example,
const { txHash, blockHeight } = tx.public;
gets the hash of the transaction that was submitted and the height of the blockchain when the transaction was added. The public property contains all public information about the transaction that was submitted. That is, data anyone can already view. Transactions for contracts with private state may contain sensitive data. To access private data, there is a corresponding private property.
Viewing Contract State​
The publicDataProvider in the providers object can be used to query for information about the blockchain. To view the current value of round defined in the counter contract, we can query the publicDataProvider and convert the result to a JavaScript object using the ledger function generated for the counter contract by the compiler.
export const getCounterLedgerState = (
 providers: CounterProviders,
 contractAddress: ContractAddress,
): Promise<bigint | null> =>
 providers.publicDataProvider
   .queryContractState(contractAddress)
   .then((contractState) => (contractState != null ? ledger(contractState.data).round : null));
At this point, you have seen enough to be able to read and understand the gist of the counter-cli/src/api.ts and counter-cli/src/cli.ts files.
Summary​
This ends part 2 of the Midnight developer tutorial.
                  1. You have installed the tools needed to be a Midnight developer.
                  2. You have learned how to build a Midnight DApp from source and run it.
                  3. You have learned how to run your own Midnight node and pub-sub indexer.
                  4. You have seen the Compact and TypeScript code for a simple DApp.
Part 3 of the tutorial invites you to engage more deeply with the process of creating a Midnight DApp, writing some of the code yourself. It also introduces you to Midnight's ability to shield private data.
Part 3: creating a DApp
In the third part of the Midnight developer tutorial, you will:
                  1. Write a contract that works with both public and private data
                  2. Fill in the missing parts of the DApp code, to create a complete and working DApp
                  3. Run a Midnight node that is disconnected from the Midnight Testnet, for testing purposes
                  4. Switch from a test configuration to a production configuration and use your new DApp on Testnet.
The example throughout part 3 is still simple, but more realistic in its scope than the counter DApp of part 2. Most importantly, it relies on Midnight's ability to use private data in public contracts, while shielding the private data by keeping it entirely local.
Finally, we discuss some additional steps that developers should take in a serious deployment to ensure the longevity of their DApp.
Prerequisites for part 3
There are no additional prerequisite components to be installed for part 3 of the tutorial. Instead, you will learn to reconfigure the 'headless' wallet and local Midnight node, which you installed in part 2, so that they operate in a disconnected mode for offline testing.
This part assumes that you have already downloaded and unpacked the Midnight examples archive and performed the configuration steps in part 2.
You will be writing some of the code yourself this time, but you will start with the incomplete material in the bboard-tutorial directory:
cd examples/bboard-tutorial
Bulletin board scenario
Imagine an old-fashioned cork bulletin board on the wall in an office hallway. This is a small bulletin board, with room for just a single piece of paper to be tacked up on it. Here are the office rules for this bulletin board:
                  1. Anyone can post a message on the board when it is vacant.
                  2. Once someone has posted a message, no one else can take it down. Only the person who posted that message may remove it.
Be sure you understand these rules. The following pages will refer back to them as 'rule 1' and 'rule 2'. You can probably imagine extending them to include content restrictions or time limits on posts, but they are kept intentionally simple for this tutorial.
What does it look like to implement an online version of this bulletin board? A globally shared space where anyone can update a message is easy to create, but how to enforce the rules?
Rule 1 can be enforced using only the public state of the bulletin board: if it's empty, allow a new message to be posted, but if it's occupied, reject attempts to post a message.
Rule 2 is more complicated, because it requires that the identity of the user attempting to remove a message be verified. (In fact, there's another constraint hidden in the English statement of the rule when it refers to the person who 'posted that message.' This implies that the user wanting to take down a post is able to prove not only their identity, but also that they tacked up that specific post.)
One obvious way to enforce rule 2 is to make users 'log in' to the bulletin board system, so that the system can authenticate their identities. This approach requires users to transmit evidence of their identities across the Internet to the bulletin board server, usually involving some sort of secret shared between each user and the server, which the server can verify.
Is there a better way? With Midnight, yes there is. You can contractually obligate anyone who wants to remove a message from the bulletin board to validate for themselves, on their own computer that they posted it. Midnight can safely and reliably enforce the terms of the contract by requiring a machine-checkable proof that the validation has occurred, without requiring the private evidence of the user's identity to be transmitted across the Internet.
On the following page, you will work through the process of writing a Midnight contract that represents this online bulletin board and enforces its rules without sending private identity information across the Internet. Then, you'll develop a DApp that can deploy a new bulletin board and post or remove messages.
Bulletin board contract
Just as with the counter DApp, there are separate subdirectories in the bboard-tutorial directory for the contract and the user interaction code. Unlike the simple counter DApp, however, the bulletin board DApp demonstrates an additional useful separation: between user interface code and the underlying application logic that is independent of the user interface. Keeping the user interface separate from the application logic allows you to create a command-line version of the bulletin board in this part of the tutorial and a web-based version in a later part.
                  * contract - contains the Compact source for the bulletin board contract, plus associated TypeScript
                  * api - contains TypeScript source that implements the core behavior of the DApp, such as posting messages and taking them down, and depends on the contract code
                  * bboard-cli - contains the command-line interface for the text-based DApp and depends on both the contract and api code.
Actually, the preceding description is not quite correct, because there is no Compact source file for the contract in the contract subdirectory yet. Your task is to write it.
tip
This page walks step by step through the design of the bulletin board contract. The finished contract appears at the end of the page. You must type or paste the Compact code into a file bboard.compact in the contract/src subdirectory of bboard-tutorial. Midnight recommends editing the contract using the Visual Studio Code extension for Compact, where you get nice colors and auto-completion of names.
To create a Midnight contract for the bulletin board scenario, you need to identify:
                  * The components of the contract's public state
                  * The visible operations that can be performed on the contract
                  * The private data and operations, used by the visible operations in ways that are provably valid, but not shared publicly.
The public state of the contract and the transaction history of the public operations appear on the ledger of the Midnight blockchain. Anyone can verify them. The private data never has to leave the DApp user's computer.
Public ledger state on the blockchain​
The public ledger state of the bulletin board consists of four values:
                  1. A state: vacant or occupied
                  2. A message
                  3. A counter to identify which specific post is current
                  4. A public token produced by the user who made the current post, but from which their private identity cannot be derived.
The third value is perhaps less obvious than the others; it corresponds to the 'that message' constraint mentioned on the previous page. When its value is 15, it says, 'The current message is the 15th post.' If you have ever implemented any sort of software lock, it will not surprise you that the correct behavior is to increment this counter whenever the board becomes vacant (not when it becomes occupied), because that is the point at which the current instance no longer corresponds to the just-removed post.
The fourth value should be a non-reversible hash of the poster's identity and the posting instance number (the counter). No one can figure out who posted the message from the token, but the user who created the post can reliably derive that token again to satisfy the identity-verification obligation.
Here is the type of that ledger state, specified in Midnight's Compact contract language:
import CompactStandardLibrary;


export enum STATE { vacant, occupied }


export ledger state: STATE;
export ledger message: Maybe<Opaque<"string">>;
export ledger instance: Counter;
export ledger poster: Bytes<32>;


constructor() {
   state = STATE.vacant;
   message = none<Opaque<"string">>();
   instance.increment(1);
}
Some notes about the types used in this ledger declaration:
                  * Notice that Compact includes support for declaring new types, such as the enumeration type that encodes the vacant or occupied state of the bulletin board. With the export modifier added to the declaration, the Compact compiler will generate TypeScript representations for the enumeration type and its values.
                  * Ledger fields with Compact types (such as STATE, Maybe, and Bytes) represent a mutable cell in the ledger, whose value can be updated by circuits.
                  * The ledger's Counter type (automatically initialized to zero), can be incremented by circuits.
                  * The builtin Compact Opaque type describes values whose internal structure is irrelevant to the contract.
                  * The standard library's Maybe type describes values that may be absent. Its values are created using the some or none constructors.
                  * The poster's identity tokens are 256-bit hashes, which occupy 32 bytes.
                  * The standard library CompactStandardLibrary contains Maybe, some, none, and Counter. (Opaque and Bytes are builtin Compact types.)
The contract need not initialize explicitly the poster field when the ledger is constructed, because its value is not meaningful yet. Every ledger field that is not explicitly initialized in the constructor is initialized to the default value of its type if the type has a default value.
Enforcing the contract: circuits​
Remember, anyone who uses this bulletin board will be required to abide by its rules, but they must do the work of proving they satisfied the contract. When they make changes to the bulletin board, they submit proofs that they followed the rules, and observers can quickly verify their proofs. Such proofs, which observers can verify without access to the data that enabled the proof construction, are called zero-knowledge proofs, and they are implemented using mathematical circuits.
These ideas are not at all new; some of the important papers about zero-knowledge proofs were published in the 1980s. The more recent developments are advances in the way such proofs can be generated and verified automatically, without human intervention, and the way they can be combined with public blockchains.
One of Midnight's unique contributions to this space is to make the definition of zero-knowledge-based smart contracts and their supporting circuits accessible to general programmers.
Begin by writing the post operation as a Compact circuit definition. The main obligation to be satisfied in this part of the contract is the bulletin board's first rule: posting can occur only when the board is vacant.
export circuit post(new_message: Opaque<"string">): [] {
   assert state == STATE.vacant
       "Attempted to post to an occupied board";
   poster = disclose(public_key(local_secret_key(), instance as Field as Bytes<32>));
   message = some<Opaque<"string">>(new_message);
   state = STATE.occupied;
}
A circuit definition is much like a function definition. It can specify input parameters and a return value. The current state of the ledger is also implicitly available in the circuit definition. As with the enum STATE type, an export modifier has been added to this definition, so that the post circuit can be called from TypeScript.
To establish enforced contractual obligations, the definition uses the assert statement, which checks that some Boolean expression is true. If the expression is false, the transaction is aborted, reporting the failure using the message specified in the assert statement. The assert above checks that the board is vacant when someone tries to post a message (rule 1).
What is this generated 'public key' that the post circuit writes into the ledger's poster field to identify the user posting the message? It is derived by hashing a string with the instance number of the post and the user's secret key, which is not sent over the network. The code above has used a call to a 'helper' circuit public_key, which is defined in the same contract. Here is its definition:
export circuit public_key(sk: Bytes<32>, instance: Bytes<32>): Bytes<32> {
   return persistent_hash<Vector<3, Bytes<32>>>([pad(32, "bboard:pk:"),
                                                 instance,
                                                 sk]);
}
Three notes about this definition:
                  1. The persistent_hash function is defined in Compact's standard library.
                  2. Typically, you would not export helper circuits like this one, because there would be no reason to call them from TypeScript. In this case, public_key is exported so that its value can be logged by the DApp, for debugging purposes.
                  3. While this circuit is named public_key, its return value is not truly one side of a key pair from public key cryptography. Instead, zero-knowledge circuits can be understood as a kind of generalization of public key cryptography. The result of this circuit serves the same role as a public key, though, so its naming is intended to evoke that sense.
Accessing private state​
So, how to retrieve secret key needed by the post circuit and passed to public_key? The function local_secret_key cannot be another circuit, because the values returned by circuits are publicly verifiable, and the value returned by this function should never appear in the ledger.
This kind of function is called a witness. Witness functions provide the API to the private state of a contract, as maintained by individual DApps that use the contract. The contract does not describe the definition of the witness; it merely declares the witness's existence. The DApp must implement it. Here is the declaration in the contract:
witness local_secret_key(): Bytes<32>;
The return values of witnesses are presumed to be private data. The Compact compiler tracks them through the program and prevents them from leaking by being revealed in the public ledger state. Specifically, in the post circuit, the result of local_secret_key() is presumed to be private. Because this value is passed to public_key, the result of public_key is also presumed to be private (or at least, based on private data). The compiler would signal an error if it were written into the public ledger state. In this case however, the hash of the poster's identity combined with the instance counter will not leak the poster's identity. Wrapping the public key value in disclose tells the Compact compiler that this disclosure is intended.
With all these tools at hand, you can write the take_down circuit, which enforces the rule that only the poster of the current post can take it down. Of course, it also makes no sense to take down a post from a vacant board, so the circuit checks that first:
export circuit take_down(): Opaque<"string"> {
   assert state == STATE.occupied
       "Attempted to take down post from an empty board";
   assert poster == public_key(local_secret_key(), instance as Field as Bytes<32>)
       "Attempted to take down post, but not the current poster";
   const former_msg = message.value;
   state = STATE.vacant;
   instance.increment(1);
   message = none<Opaque<"string">>();
   return former_msg;
}
This circuit returns the message that was taken down, to demonstrate that public circuits can return values, too.
When a DApp submits a take_down transaction to the Midnight network, it does not include the private data that would allow other contract participants to check the second assert. Notice that the Compact compiler does not require public_key to be explicitly disclosed in this circuit. The take_down transaction includes a verifiable proof that each assert has been checked. The compiler generates all the material to make this possible 'behind the scenes,' without the DApp programmer ever having to write code that appears to generate and transmit proofs.
Compiling the contract​
That's everything. Here is the complete contract.
pragma language_version >= 0.14.0;


import CompactStandardLibrary;


export enum STATE { vacant, occupied }


export ledger state: STATE;
export ledger message: Maybe<Opaque<"string">>;
export ledger instance: Counter;
export ledger poster: Bytes<32>;


constructor() {
   state = STATE.vacant;
   message = none<Opaque<"string">>();
   instance.increment(1);
}


witness local_secret_key(): Bytes<32>;


export circuit post(new_message: Opaque<"string">): [] {
   assert state == STATE.vacant
       "Attempted to post to an occupied board";
   poster = disclose(public_key(local_secret_key(), instance as Field as Bytes<32>));
   message = some<Opaque<"string">>(new_message);
   state = STATE.occupied;
}


export circuit take_down(): Opaque<"string"> {
   assert state == STATE.occupied
       "Attempted to take down post from an empty board";
   assert poster == public_key(local_secret_key(), instance as Field as Bytes<32>)
       "Attempted to take down post, but not the current poster";
   const former_msg = message.value;
   state = STATE.vacant;
   instance.increment(1);
   message = none<Opaque<"string">>();
   return former_msg;
}


export circuit public_key(sk: Bytes<32>, instance: Bytes<32>): Bytes<32> {
   return persistent_hash<Vector<3, Bytes<32>>>([pad(32, "bboard:pk:"),
                                                 instance,
                                                 sk]);
}
In the contract subdirectory of bboard-tutorial, there is a build script to run the Compact compiler as part of the build, but it is instructive to run the compiler manually this time.
After saving the preceding contract as bboard.compact in bboard-tutorial/contract/src, compile it with the Compact compiler like this (assuming that you have added the Compact compiler's directory to your PATH following the instructions provided in Running Midnight Compact compiler and that your current directory is the contract directory when you run the command):
compactc src/bboard.compact src/managed/bboard
You should see a message about the circuit complexity for each of the public circuits (post, take_down, and public_key) when you run the compiler. If you see an error message, check your code for mistakes. If you need help, contact the Midnight Developer Relations team or your fellow developers on Discord.
You can see the TypeScript API that the Compact compiler generated for the contract in src/managed/bboard/contract/index.d.cts. The DApp will rely on this API to deploy the contract and call the circuits.
Bulletin board DApp
What remains to be done, in order to have a working bulletin board DApp, is to complete the TypeScript code. For the sake of simplicity, the initial version of the DApp will have text-based menu prompts (making it look like something out of the early 1980s). The creation of a web GUI is left for a later part of the developer tutorial.
To get you started, most of the code is already written for you, including the interactive menu prompts. However, most of the parts that manipulate the contract and the private state are missing. Filling in those missing parts is your work for this part of the tutorial.
At this point, you should already have the contract in its contract/src subdirectory. Following the instructions on the preceding pages, you have compiled the contract, producing the contract's TypeScript API and other material in the managed subdirectory.
Most of the TypeScript code you need is already written for you, in the contract/src, api/src, and bboard-cli/src directories. As with the counter application, bboard-cli/src/index.ts contains the main run loop of the application while api/src/index.ts contains convenient abstractions for implementing the application. But, two files in the project are incomplete:
                  * contract/src/witnesses.ts
                  * api/src/index.ts
Open these in your favorite TypeScript editor and get ready to fill in the missing pieces. (The discussion below sometimes refers to code in the file without displaying it on this page, so you must follow along in the code in your own editor to understand what's being said.)
Exercise 1: define the private state​
Down at line 18 of witnesses.ts, you will find a comment identifying the place where you need to fill in some code for exercise 1. Look at its context in your editor.
The public state of the contract is stored in the blockchain and can be seen by anyone, but the private state is entirely local to the DApp and may be completely different for each user. A contract only declares the types of the functions for accessing and changing the private state; the contract does not define the functions, nor does it say anything about the type or structure of the private state itself. Thus, some parts of the generated contract API are parameterized by the type of the private state.
A good practice is to define an interface or type alias for the private state.
Now ask yourself: what should be held in the user's private state for the bulletin board? Hint: In this example, the private state does not evolve. It is simply a value that can be fetched through the local_secret_key() witness that the contract declared.
If you answered, 'the secret key,' you were right. The bulletin board contract declared the type of the secret key data to be a byte array, which corresponds to the TypeScript type Uint8Array, so fill in the missing code, defining the BBoardPrivateState type to have a secretKey property of type Uint8Array, like this:
export type BBoardPrivateState = {
 readonly secretKey: Uint8Array;
};
The next code in witnesses.ts defines a helpful function to create objects of type BBoardPrivateState, given a secret key. Fill in that code, too, so that it matches the type you just defined. When you are done, it should look like this:
export const createBBoardPrivateState = (secretKey: Uint8Array) => ({
 secretKey,
});
Exercise 2: initialize the private oracle​
In the research literature about zero-knowledge proofs, the part of the system that is consulted to access private state is called an oracle, so you will sometimes find that term appearing in the Midnight API and documentation. The next exercise is to create an object to represent the bulletin board DApp's private oracle: its set of witness functions.
Below the code you edited in exercise 1, you will find the definition of the witnesses object. The object must have a property (or method) for each of the contract's declared witness functions. Recall that bboard.compact declared only one witness function: local_secret_key. The type and outer structure of the function is already written for you. Exercise 2 is to fill in the missing return values.
Look carefully at the function's type:
                  * It takes a single argument, which is a WitnessContext. If the contract had declared additional parameters for the witness function, they would appear here as additional parameters, after the WitnessContext.
                  * It returns two values: a new overall state for the private oracle and a value corresponding to the declared return type of the witness function in the Compact code.
The WitnessContext type is parameterized by the ledger type L and private state type PS, so that it has three fields:
                  * ledger: T
                  * privateState: PS
                  * contractAddress: string
You can see that the WitnessContext type in this file is instantiated with the Ledger type imported from the API that the Compact compiler generated for the bulletin board contract, plus the private state type BBoardPrivateState that you defined in exercise 1. This means that the privateState field in the WitnessContext will be of type BBoardPrivateState. This is the only field needed from the WitnessContext, so the definition uses TypeScript's parameter destructuring notation to name only the privateState from the context and ignore the ledger and contractAddress.
Now fill in the two values that local_secret_key should return. First, what is the new private state? Hint: local_secret_key does not change the private state.
The correct answer is that the new private state is the same as the old private state: simply the value privateState.
Now what about the 'interesting' return value, the one declared in the contract? The purpose of this function is to get the user's secret key, so that the contract can use it to generate and verify a public hash. For the second return value, extract the secret key from the private state. (You defined the contents of the private state in exercise 1.)
Putting these together, your solution should look like this:
export const witnesses = {
 local_secret_key: ({ privateState }: WitnessContext<Ledger, BBoardPrivateState>): [BBoardPrivateState, Uint8Array] => [
   privateState,
   privateState.secretKey,
 ],
};
The bulletin board never needs to change the private state, but more complex contracts will need to update the private state. The way to do that is not to mutate the state in place, but to return a new state value from a witness function.
caution
Do not use a global variable to hold or access the private state; always use the value passed to the witness function.
The file witnesses.ts is complete. Look now at the file containing the main logic of the bulletin board DApp: api/src/index.ts.
In the remaining exercises, you will call the post and take_down circuits you defined in the bulletin board contract and then write the code to deploy the contract to the Midnight network.
Exercise 3: invoke the post circuit​
Find the comment that identifies the missing code for exercise 3, at about line 122. It's in a post function. You can see that the declaration of the return values is already in place. The task for exercise 3 is write the code that creates and submits a post transaction on the contract.
There is only a small amount of code to write, but it requires a few steps to explain it. First, notice that post function is actually a method in the BBoardAPI class. The class's constructor takes a DeployedBBoardContract as its first argument, implicitly making the value available as a deployedContract field in the object. The type DeployedBBoardContract is defined in the adjacent file common-types.ts as an alias of FoundContract.
FoundContract is the base abstraction Midnight.js provides for creating and submitting transactions for smart contracts that have already been deployed to the blockchain. It is called FoundContract because it works with contracts that have been "found" on-chain. In other words, FoundContract is indifferent to who deployed the contract for which it submits transactions.
There is a subtype of FoundContract called DeployedContract which offers the same transaction builders but works with contracts that were deployed specifically by your application. Consequentially, DeployedContract contains private information related to the contract deployment that FoundContract does not contain. Since this application doesn't make use of said private deployment information, DeployedBBoardContract is defined in terms of the more general FoundContract type.
A FoundContract has a callTx property of type CircuitCallTxInterface. Through a bit of TypeScript magic, the CircuitCallTxInterface type contains, for each circuit defined in your contract, a function that will create and submit a call transaction for that circuit. Putting all that together, the code to post a new message to the bulletin board looks like this:
const txData = await this.deployedContract.callTx.post(message)
What if the user tries to post a message to a non-empty bulletin board? The transaction will fail, and the code will throw an exception. The current bulletin board DApp lets the exception propagate out to the main run function in bboard-cli/src/index.ts, so that the DApp exits. Once you have completed the DApp and tested it successfully, you could come back here and add an appropriate try / catch around the call to report the transaction failure in a more helpful way.
Exercise 4: invoke the take-down circuit​
In the takeDown function, just after the post function, you'll find the comment identifying the destination for exercise 4's code. (After you have completed exercise 3, the marker for exercise 4 should be near line 148.)
You might not have figured out the answer to exercise 3 on your own, but after completing it, you can probably do exercise 4 without much help. Try writing the code yourself before looking at the answer below. (The take_down circuit is defined to return the old message, but this program doesn't need it, so you can ignore it and simply report that the transaction was submitted.)
Here is a solution:
const txData = await this.deployedContract.callTx.take_down();
Exercise 5: deploy a new bulletin board contract​
You have seen that the code to invoke one of your contract's circuits and submit a corresponding transaction to the Midnight network is quite simple. The code to deploy a new contract is a little more complicated, but still short.
Find the comment that identifies the missing code for exercise 5, at about line 172 after completing the preceding exercises. It's in a deploy function. You can see that the call to deployContract is started for you. The task for exercise 5 is to fill in the arguments correctly.
The deployContract function requires two arguments. They are:
                  1. A MidnightProviders object containing implementations of all the necessary providers (refer back to the discussion of providers in part 2 of the tutorial if necessary)
                  2. A DeployContractOptions object containing configuration parameters for the deployment.
For the bulletin board contract, DeployContractOptions requires only three properties:
                  1. privateStateKey - The name of the key at which the private state is stored in the PrivateStateProvider given in the first providers argument.
                  2. contract - The Contract object containing the executable JavaScript of the contract being deployed.
                  3. initialPrivateState - The initial private state for the contract, whose type matches the state stored under the privateStateKey.
You can fill in the first argument to deployContract easily because the deploy function already has a providers parameter.
providers,
The second argument to deployContract is the configuration object.
{
 contract: bboardContractInstance,
 privateStateKey: 'bboardPrivateState',
 initialPrivateState: createBBoardPrivateState(utils.randomBytes(32))
}
To understand the deployment configuration, let's look at its entries one by one. The first entry,
contract: bboardContractInstance,
is defined in terms of a constant bboardContractInstance,
const bboardContractInstance: BBoardContract = new Contract(witnesses);
which is just an instance of Contract (which is generated by compactc) constructed with the witnesses you defined at the beginning of the tutorial.
The second entry
privateStateKey: 'bboardPrivateState',
indicates that the FoundContract returned from deployContract should store its private state at key bboardPrivateState in the private state provider given in the providers argument. Furthermore, because providers.privateStateProvider is of type PrivateStateProvider<PrivateStates>, the private state of the contract must be an object of type BBoardPrivateState.
The third entry
initialPrivateState: createBBoardPrivateState(utils.randomBytes(32)),
is defined using the function createBBoardPrivateState you wrote in the second half of exercise 1 to construct the private state for the bulletin board contract. The initial secret key is created from the randomBytes function provided for you in api/src/utils/index.ts. It is called with the number of bytes you need: 32.
Putting all that together, the call to deployContract should look like this when you are done:
 const deployedBBoardContract = await deployContract(providers, {
   contract: bboardContractInstance,
   privateStateKey: "bboardPrivateState",
   initialPrivateState: createBBoardPrivateState(utils.randomBytes(32))
 });
That's remarkably little code to deploy an entirely new contract to the Midnight blockchain.
The code for joining an existing contract is similar to the code for deploying a new one. You might want to look now at the code in the join function (just below the definition of deploy) and compare it to the code in deploy.
You can explore the documentation for Midnight library functions, such as deployContract and findDeployedContract, in the Midnight.js reference documentation. For your convenience, here are links to the documentation for those two functions:
                  * deployContract
                  * findDeployedContract
Compiling and running the DApp​
If you have completed all the exercises, then your bulletin board DApp is ready to be compiled. Go back to the bboard-tutorial directory (the one containing contract, api, and bboard-cli) and run:
npx turbo build
If the project does not build successfully, you must have made a mistake along the way. Go back and check your work, or ask for help.
Also, adjacent to the bboard-tutorial directory in the examples package, there is a bboard directory with working answers for every exercise. If you think there is a mistake in this documentation, check the contents of bboard, because that code is tested regularly to be sure it works with the current Midnight TestNet.
Once the project is built, go on to the next page to learn how to test your code without touching the live Midnight network.
Midnight test environment
In the preceding parts of the tutorial, you ran DApps that were already complete and tested. In this part, however, you have been writing portions of the DApp yourself, and you probably want to try out your work before deploying the DApp to the Midnight network.
The Midnight team has already created a compose file for Docker that runs a proof server, Midnight node, and pub-sub indexer locally, configured so that they run disconnected from the Midnight network. In effect, the Midnight node acts as if it is its own isolated Midnight network. This allows you to test contracts and DApps entirely on your own system, before deploying them to the real network.
If you want to review the details, you can see the Docker compose definition in this file:
bboard-tutorial/bboard-cli/standalone.yml
The important part is the environment variable CFG_PRESET set to dev in node definition. That tells the node to run standalone without connecting to any other nodes.
Before running this test configuration, you must stop any existing proof server, indexer, and node. Then, if you want, you can start and stop the test configuration to verify that it works.
Do not leave the test configuration running in Docker for the next steps, though, because you will test the bulletin board DApp by launching it with a command that starts and stops the whole standalone.yml configuration automatically as part of running the DApp.
Run the DApp in standalone mode​
In the bboard-tutorial/bboard-cli directory, launch the DApp with:
yarn standalone
After verifying that the latest images of the proof server, indexer, and Midnight node are pulled from the Midnight image server, the DApp will launch the Docker configuration in standalone.yml and wait for it to be ready.
Then, the DApp will start in standalone mode, not prompting to create or restore a wallet, but instead, creating a new wallet with tDUST that is valid only for such offline testing.
When the wallet is ready, DApp asks whether it should join an existing contract or deploy a new one. There is no existing contract to join, so deploy one. Then, explore the possibilities with the DApp, posting a message and examining the public and private state.
When you exit the DApp, the Docker containers should stop be and be cleaned up automatically.
Run the DApp connected to the Testnet​
When you are ready to try out your DApp on the Midnight Testnet, be sure you have not left it running and that your standalone Docker configuration has exited. Then, start your proof server again. When it is ready, start the DApp with this command:
yarn testnet-remote
This time, you will need real tDUST, so either create a new wallet and transfer some tDUST to it from your Midnight Lace wallet, or look back at the logs from your experiments with the counter DApp in part 2 to find the seed for your headless wallet:
examples/counter/counter-cli/logs/testnet
Once the DApp has found some tDUST in your wallet, it will proceed and allow you to deploy your bulletin board to Testnet.
Summary​
Have fun playing with the bulletin board DApp. If you are ambitious, you could create a separate DApp to watch a bulletin board, showing the messages that are posted and saying when they are taken down. The code in the displayLedgerState function in bboard-cli/src/index.ts will help you get started. You could also share the address of your bulletin board contract with a friend and see each other's posted messages.
Congratulations! You have created a working DApp around a non-trivial Midnight contract, with real rules that are enforced automatically. You have written parts of the DApp yourself, and you have learned to test it offline.
At this point, with the help of the reference documentation, you know enough to begin creating your own command-line contracts and DApps. Later parts of this developer tutorial will show you how to add a web UI for your DApps and connect them to the Midnight Lace wallet.
DApp updatability
Updating code in a decentralized environment is challenging, because producing an update is typically a centralized process, and this can be employed maliciously. It is however often necessary to have some path to changing deployed contracts and DApps, and Midnight provides this through Contract Maintenance Authorities (CMAs).
By default, as has been the case through this tutorial, a maintenance authority is empty, meaning no user is able to perform an update to the corresponding contract. At deploy-time, the deployer can instead nominate a set of public keys, and specify a threshold for how many of these public keys need to come together to sign an update, to allow updatability of this contract. This can be used to decentralize the power to update to a group, which needs to agree and sign off on updates jointly, or simply to have a single owner control a contract.
warning
While Midnight does not require a deployed contract to nominate a CMA, we strongly advise DApp authors to be aware of the trade-offs involved before making this decision.
Why should you care?​
Even if your are familiar with updatability in other blockchain ecosystems, there is an important difference for Midnight that may affect what you think is right for your DApp. In most ecosystems, a deployed contract is guaranteed to run as deployed indefinitely, and this lessens the need for updatability. In Midnight, as contracts are in part zero-knowledge proofs, any breaking update to our proof system – including security updates – may require contracts to update to the new proof system. Put differently, old contracts may be disabled after system upgrades in the future.
This is especially true prior to mainnet, during which time we will not provide any support for prior versions of our proof system. At or before mainnet launch we will refine this support policy. Put differently: We will, with notice, remove support for old deployments of contracts from Midnight. Updatable contracts will be able to migrate, but non-upgradable ones will not, by definition.
danger
Non-upgradable contracts should plan to allow users to withdraw their funds in a timely manner (in less than a week) to prevent loss of user funds. Upgradable contracts should make a commitment to upgrade timelines, or similarly provide a path to withdraw funds in case the contract is not upgraded.
At this time, Midnight's APIs are tooled only towards one-user authorities, although the underlying system can cope with arbitrary party configurations.
Capabilities of a maintenance authority​
A contract maintenance authority (CMA) is able to perform various privileged actions to change a contract after deployment. These make use of a 'verifier key version', a combined version of proving system and the onchain runtime. A contract can have multiple active verifier key versions at the same time, and can have keys registered for each of them. This allows supporting transitions between versions, and in the future may be used to provide long-term support for some verifier key versions. A contract maintenance authority can perform the following privileged actions:
                  * Change the CMA associated with this contract – this CMA then succeeds the current one; this can be used to relinquish control.
                  * Remove a verifier key (of a specific version) from the contract – this will reject future transactions that attempt to use this operation with this specific verifier key version. The key removed must exist.
                  * Add a new verifier key of a specific version – this adds new functionality to a contract, or re-exports existing functionality with a new verifier key version. A key may not already exist to insert it, it must first be removed.
info
Removing and re-adding a verifier key can be used to change the implementation of a circuit, modifying its behaviour. Be aware that this is a very powerful capability!
Maintenance authorities can make changes by signing a sequence of the above 'single updates' into a combined 'maintenance update'. Currently, maintenance updates take effect immediately, although this functionality may be refined over time.
How to operate a maintenance authority​
Maintaining a maintenance authority introduces three new things for a DApp developer to manage:
                  1. They need to generate and store key pairs for the authority
                  2. They need to modify deployment to add the authority
                  3. They need to provide an interface for the authority to produce and sign updates
The initial contract authority of a contract being deployed can be specified by providing a value for signingKey in DeployContractOptions. The initial signing key can be sampled with sampleSigningKey. Note that the same CMA can be used in multiple contracts by specifying the same signing key for different deployments.
A deployed contract's circuits can be updated using the DeployedContract object's circuitMaintenanceTx property, which contains one CircuitMaintenanceTxInterface for each circuit defined on the contract. This allows inserting new verifier keys and removing existing verifier keys with insertVerifierKey and removeVerifierKey respectively. Similarly, a deployed contract's maintenance authority can be updated using the DeployedContract's contractMaintenanceTx property. For example, deployedContract.foo.insertVerifierKey(key) inserts the verifier key key for the foo circuit in the deployed contract deployedContract.
How Midnight works
This section provides an overview of how Midnight functions, starting with an overview of Midnight's approach to smart contracts, why this approach is useful, and how to make it work for you. It then goes into technical details of what Midnight's blockchain does, detailing the shape of transactions, ledger states, and the semantics of transactions on Midnight.
Midnight currently functions on Testnet. Features may be added, removed, or revised at any time.
Smart contracts on Midnight
While you may have some familiarity with smart contracts, designing smart contracts for data protection provides unique challenges and perspectives. This article will therefore briefly walk through key points in which Midnight differs from more public smart contract solutions and how this should inform your construction of contracts in Midnight.
Replicated state machines​
All blockchain systems are replicated state machines at their core: They keep a ledger state, which is modified by transactions. Various blockchains differ in which transactions are considered valid and what effect they have on a ledger state.
Smart-contract-enabled blockchains allow transactions to program parts of the blockchain's validity criteria that subsequent transactions have to satisfy. The focus here is on the account model, where contracts are deployed by a transaction, which assigns a unique address to the contract in the blockchain. This contract can define the validation criteria and state transitions for the transactions that interact with it.
The following example illustrates these ideas. Imagine a contract to support a guessing game, in which the player guesses factors of a number, stored in the contract's state. Making a correct guess allows the player to set the next number for the opposing player(s). Thus, when making a guess, the player offers two factors for the current number and two factors to define the new number. The logic of a guess is expressed in pseudocode as follows:
note
This is pseudocode, not a functional Compact program.

def guess_number(guess_a, guess_b, new_a, new_b):
 assert(guess_a != 1 and guess_b != 1 and new_a != 1 and new_b != 1,
   "1 is too boring a factor")
 assert(guess_a * guess_b == number,
   "Guessed factors must be correct")
 number = new_a * new_b
The contract could just let the player provide the new number directly, instead of its factors, but then they could (whether by accident or intentionally) also spoil the fun by passing in a prime number. Forcing the player to provide 'interesting' factors eliminates this possibility.
When the contract is deployed, this program is put directly on-chain, typically in a compressed, bytecode form, along with an initial state of the contract. Conceptually, this may make the ledger's state look something like this:
contracts:
 "<contract address>":
   state:
     number: 35
   entryPoints:
     guess_number: |
       def guess_number(...):
         // ...
A transaction can then call this contract by supplying inputs to the function, for instance:

transaction:
 type: "call"
 address: "<contract address>"
 entryPoint: "guess_number"
 inputs: [5, 7, 2, 6]
When processed, nodes process this by:
                  * looking up the state at <contract address> as well as the program at <contract address> and guess_number
                  * running the program against the state, and inputs
                  * if the program succeeds, storing the new state.
Midnight contracts, conceptually​
You may have noticed that the above program is not a good implementation for this game, because every time a new number is set, its factors are publicly visible as part of the transaction that sets it. Anyone who really wants to win can read off the factors and use them as their own 'guess'. Where's the sport in that?
To move beyond this problem, imagine that you don't have to worry about the blockchain and how it processes transactions. Instead, consider a contract as an interactive program that can interact with the contract's on-chain state, as well as call arbitrary code on the user's local machine.
In this setting, it's possible to rewrite the above pseudocode program to look something like this:
def guess_number():
 (a, b) = local.guess_factors(number)
 assert(a != 1 and b != 1, "1 is too boring a factor")
 assert(a * b == number, "Guessed factors must be correct")
 (a, b) = local.new_challenge()
 assert(a != 1 and b != 1, "1 is too boring a factor")
 number = a * b
While this program is longer than the one in the previous section, it is also doing slightly more. It tells us where the numbers come from: local calls to guess_factors or new_challenge respectively. Often this is what happens anyway, with transaction inputs needing to be carefully computed ahead of time to ensure that the corresponding transaction succeeds. Here, the API is clear, and the guess_factors routine is even given the number for which it should guess (which previously you'd have to figure out for yourself).
On the chain, this interaction would have the following interactions:
                  * retrieving number ledger field
                  * setting number ledger field.
Neither of these reveals the details of the factors - neither the ones guessed, nor the ones the new challenge consists of.
A practical challenge with this approach is how to ensure that the contract is correctly used. For the local calls, this is an accepted risk; we don't want to prescribe how guess_factors works, for instance, just that it outputs correct guesses (hence the input validation). For the contract program itself, we want other users to be convinced that we ran the right program and that the changes made to the contract's state are sensible.
Transcripts and ZK Snarks​
The key technology that makes everything work is the ZK Snark. At their core, ZK Snarks (and more broadly zero-knowledge proofs) are a way to prove that you know how to assign values to a number of variables, so that they satisfy some set of clear, mathematical conditions. Some of these variables are public, while most are not.
The above program can be cleanly split into three interacting parts, each run in a separate environment: The local part, the ledger part, and the glue that links the two together and encodes the core program logic. This 'glue' can be converted into a series of variable assignments and equations that can be transformed into a ZK Snark, while the ledger interactions can be converted into a program that runs on-chain.
Here, in the example of factoring the current state of 35 into 5 * 7 and replacing it with 2 * 6:
Off-chain code
(a, b) = local.
 guess_factors(n1)
(a, b) = local.
 new_challenge()
⇓
Private transcript
a1 = 5
b1 = 7
a2 = 2
b2 = 6
In-circuit code
def guess_number():
 assert(a != 1 and b != 1, "...")
 assert(a * b == n2, "...")
 assert(a != 1 and b != 1, "...")
 n3 = a * b
⇓
Circuit constraints
guess_number:
 inputs:
   public: n1, n2, n3,
     transcript code
   private: a1, b1, a2, b2
 constraints:
   a1 != 1
   b1 != 1
   a1 * b1 = n2
   a2 != 1
   b2 != 1
   n3 = a2 * b2
   // Additional constraints
   // enforcing the shape of
   // the public transcript
On-chain code
n1 = number
n2 = number
number = n3
⇓
Public transcript
n1 = 35
n2 = 35
n3 = 12


assert(n1 == number)
assert(n2 == number)
number = n3

More complex programs, with function calls, conditionals, iterations, and complex primitives such as hash function calls can also be translated in this way. See the writing a contract section of this documentation for a description of the language we use to write these programs.
In the preceding example, it is possible to prove that, for public n1, n2 and n3, we know values of a1, b1, a2, and b2 for which these equations hold. This proof does not say that anyone actually ran the above program, but it does say that the program's rules were followed, which is what a skeptical user truly cares about.
The sequence of assignments, n1, n2, and n3, and the program that produces or uses them is referred to as the public transcript, and conversely a1, b1, a2, and b2 are the private transcript. Public transcripts are encoded as bytecode[^1], and the shape of this bytecode is directly enforced by the circuit.
Transactions in Midnight then are essentially made up of the public transcript and a zero-knowledge proof that this transcript is correct. Each transaction is made with respect to a contract and a specific circuit[^2] on that contract. On-chain, instead of storing the code for guess_number(), a cryptographic key used to verify zero-knowledge proofs for guess_number() is stored. This cryptographically encodes and enforces all of the equations listed in the circuit above.
Broadly, the state looks something like this:
contracts:
 "<contract address>":
   state:
     number: 35
   entryPoints:
     guess_number: "<verifier key>"
And a transaction made against this state might look something like:
note
This is a sketch of a transaction.
transaction:
 type: "call"
 address: "<contract address>"
 entryPoint: "guess_number"
 transcript: |
   n1 = 35
   n2 = 35
   n3 = 12
   assert(n1 == number)
   assert(n2 == number)
   number = n3
 proof: "<zero-knowledge proof>"
This transaction, when it is verified, will check that the proof is valid with respect to the verifier key and then run the transcript. Here it checks that things are still as expected; if the current number isn't 35 the transaction is no longer valid – whoever made it did not guess the factors of 35, after all. The result of the transaction (if it succeeds) is updating the state to contain 12 – and importantly, this transaction tells no one which factors were used there, or in the guess!
A reasonable question is why the number check occurs twice, and in practice, this is a valid observation: There is no need to read the same value multiple times. However, this way of handling external interactions means that the operations performed here are arbitrary; the zero-knowledge proof had no knowledge of what a read is or that the values of n1 and n2 are necessarily the same, and this allows the use of more interesting operations, such as increment or insert. These are particularly useful to avoid making transactions invalid due to results not matching, as in the case of 35 above. Contrast two simultaneous invocations of increment with two simultaneous sequences of reading a value, adding 1, and writeing it again; the increment will (almost) always succeed, while the read-add-write sequence is prone to failure.
Putting value at stake​
It's not immediately obvious how the notion of value fits into this model. In public blockchains, it's easy for a smart contract to have a value as well as a state, which can be used to pay into and out of the contract. As this transfer of value is important to many applications, it is necessary to achieve such transfers in a setting that preserves data privacy.
The Midnight token currently uses an implementation of Zswap, which operates similarly to UTXOs, but shields the token values, types, and fund holders. An exception to total shielding applies to the funds held by a contract; the value and type of these are still shielded by default, but holding and releasing them is linked to the contract.
These UTXOs are represented in contracts as individual coins, which are just data until they are explicitly received. Once received, they can be handled like any other data – whether they are stored publicly, encrypted, or stored privately is up to the contract itself. When a contract wishes, they can then be sent to another contract or to a user address.
Coin receives and sends have special semantics: They are recorded as operations in the public transcript but have no effect on the contract's state. Instead, they require a corresponding input or output to be included in the same transaction, ensuring that a contract doesn't receive funds that don't exist or send funds it doesn't have.
Again in pseudocode, wagers can be attached to the example:
def guess_number(new_wager):
 (a, b) = local.guess_factors(number)
 builtin.send(wager, local.self())
 assert(a != 1 and b != 1, "1 is too boring a factor")
 assert(a * b == number, "Guessed factors must be correct")
 (a, b) = local.new_challenge()
 assert(a != 1 and b != 1, "1 is too boring a factor")
 number = a * b
 builtin.receive(new_wager)
 wager = new_wager
Factoring and keys​
The example of factoring may seem like a toy, and it is somewhat arbitrary, but it is worth noting that factoring large integers is an important problem in cryptography. Knowing the factors of large numbers is the basis of the RSA cryptographic algorithms, and the simple guessing game corresponds to proving that you know the secret keys for an RSA public key. This shows the power of zero-knowledge proofs and that they can serve the same purposes as signature schemes. Not only can you prove you know a secret key, but you can then prove that the same person did something else, effectively signing what they did.
In practice, if you want to authenticate, this construction is not the most efficient; proving the knowledge of a preimage of hash functions (that is, knowing sk such that pk = H(sk)) is a simpler alternative in most cases.
________________


[^1] For advanced reading of how the operations are encoded, see the details of Midnight's on-chain VM, Impact.
[^2] Circuits are named such as the compilation of zero-knowledge proofs has many similarities with assembling a special-purpose logic circuit
The benefits of Midnight's model
A reasonable question might be why Midnight needs any notion of public state at all. Wouldn't a smart contract with no publicly visible data also achieve better confidentiality?
The need for public states​
This is appealing, and in certain cases, better privacy can be achieved using additional cryptography, such as secure multi-party computation (MPC) or fully-homomorphic encryption (FHE). These approaches generally come with their own drawbacks, however, and there is one central reason that publicly visible data is a core part of Midnight's model: it is often desirable.
In particular, public data is essential in a decentralized system. Users of a decentralized system want to be able to join smart contracts freely, and contracts are often designed without knowing who will use them ahead of time. This requires some sharing of data – how do you know if you want to interact with a contract if you don't know what it is or how to interact with it?
The premise of Midnight is to enable seamless interaction between the shared public data of a contract and confidential data that you do not wish to share. For instance, an auctioneer wants to show off what is being auctioned and perhaps (depending on the auction) the current highest bid, while a winning buyer wants to keep their identity secret. Or, an insurance company may wish to list its policies publicly, while clients do not wish the details of their policies to be listed.
Contention​
One problem that can arise with public states is contention. If multiple users interact with a contract, naive designs can lead to the users stepping on each other's toes. Consider a simple counter contract, where users increment a publicly stored counter. A naive implementation may a) read the current value, and b) set the new value to the read value + 1. This can be a problem if the steps are recorded separately in the transaction, say as [read 1, write 2]. If two of these transactions get submitted simultaneously, they will conflict, and only the first will succeed. For the others, the value read is no longer 1, so the transaction will fail. If instead the transaction is structured to contain a single-step increment – for instance [incr 1] – then all transactions can succeed.
Midnight is designed to help contract authors structure their interactions in a non-conflicting way, so that contracts do not need to deal with contention in most cases. In some cases, contention is unavoidable: If I put $10 in a pot, only the first person can claim it, by design.
Transaction fee predictability​
One aspect still under revision in Midnight is the predictability of transaction fees. The design goals are both that users don't overpay for transactions and also that users don't pay fees for transactions that fail.
Midnight's on-chain language, Impact is designed so that users can reliably predict fees in many cases, and our approach to transaction fallibility enables smart contract authors to structure contracts so that failed transactions fail early, before fees are taken.
How to keep data private
This document describes some strategies for keeping data private in Midnight contracts. This is not an exhaustive list, but it should help you get started.
The most crucial thing to bear in mind is that, except for [Historic]MerkleTree data types, anything that is passed as an argument to a ledger operation in Compact, as well as all reads and writes of the ledger itself, are publicly visible and should be treated as such. What is public is the argument or ledger value itself, not the code that manipulates it. For instance:
export ledger items: Set<Field>;
export ledger others: MerkleTree<10, Field>;


// Reveals `item1`
items.insert(item1);
// Reveals the *value* of `f(x)`, but not `x` directly
items.member(f(x));
// The exception: Does *not* reveal `item2`, though someone that
// guesses the value of `item2` can check it!
others.insert(item2);
However, sometimes you need to reference shielded data in the public state. In those cases, one of the patterns below may help.
Hashes and commitments​
The most basic approach to storing data in public, while keeping it shielded, is to store only a hash or commitment of data, rather than the full data itself.
Compact's standard library provides two primary primitives for this:
                  * persistent_hash, a building block to hash binary data
                  * persistent_commit, a primitive for creating commitments from any Compact type.
Both of these effectively create a hash of their inputs, with persistent_hash being limited to the Bytes<32> data type and persistent_commit hashing arbitrary data together with a Bytes<32> random value. Hashes guarantee that the input cannot be computed from the output, nor any information about the input guessed, unless the whole input is guessed. This is one reason the additional randomness input of persistent_commit is important: it prevents someone from guessing the value itself and checking that the hash matches. This is especially useful when there are a small number of possible values, such as an individual vote in an election.
The other advantage of randomness is that it prevents correlating equal values: even if I can't guess someone's password, for instance, I might recognize if the same hashed version appears twice, which might unintentionally leak information about who made a state change.
With sufficient randomness used, the commitment of a value can be stored on the ledger without revealing it.
Randomness and rounds in commitments​
Fresh randomness for each commitment is desirable, but in some cases, it is possible to re-use existing randomness by guaranteeing that the data will never be the same for the same randomness. We use this in some of our example applications, where we reuse a secret key as a randomness source, together with a round counter to ensure unlinkability between rounds.
caution
Be careful working with randomness! It's easy to get wrong, and erring on the safe side is generally advisable.
Authenticating with hashes​
One of the most useful features of zero-knowledge proofs is that it's possible to emulate signatures just by using hashes in a circuit. That is, just by hashing a secret key and comparing that with a known 'public key', a contract can guarantee that only someone that knows the secret key can continue the transaction. For instance, here's a contract that allows only the creator to use it:
import CompactStandardLibrary;


witness secret_key(): Bytes<32>;


export ledger organizer: Cell<Bytes<32>>;
export ledger restrictedCounter: Counter;
constructor() {
 organizer = public_key(secret_key());
}


export circuit increment(): Void {
 assert organizer == public_key(secret_key()) "not authorized";
 restrictedCounter.increment(1);
}


circuit public_key(sk: Bytes<32>): Bytes<32> {
 return persistent_hash<Vector<2, Bytes<32>>>([pad(32, "some-domain-seperator"), sk]);
}
Making use of Merkle trees​
Merkle trees, exposed in Compact as the MerkleTree<n, T> and HistoricMerkleTree<n, T> types, are a very useful tool for shielding the values contained in a set. Their key feature is making it possible to assert publicly that some value is contained within the MerkleTree, without revealing which value this is.
This goes above and beyond having, for instance, a Set<Bytes<32>> storing commitments and testing if a commitment is inside it, because a MerkleTree does not reveal which entry's membership is proven. This property can be used, for instance, to authorize a set of secret keys to do specific operations, without each operation revealing which key was used to authorize it.
In practice, this works by a circuit proving that it has knowledge of a path to an inserted value in the tree and checking that the hash of this path matches the expected path of the tree.
The Compact standard library and compact JavaScript target ADTs provide tools for these operations. Specifically, examine the MerkleTreePath<n, T> type, the merkle_tree_path_root<n, T>() circuit, and the pathForLeaf() and findPathForLeaf() functions exposed on the MerkleTree/HistoricMerkleTree JavaScript state objects, as described in the ledger data types specification.
Together, they can be used as follows:
import CompactStandardLibrary;


export ledger items: MerkleTree<10, Field>;


witness find_item(item: Field): MerkleTreePath<10, Field>;


export circuit insert(item: Field): Void {
 items.insert(item);
}


export circuit check(item: Field): Void {
 const path = find_item(item);
 assert items.check_root(merkle_tree_path_root<10, Field>(path.value)) "path must be valid";
}
With the find_item implementation:
function find_item(context: WitnessContext, item: bigint): MerkleTreePath<bigint> {
   return context.ledger.items.findPathForLeaf(item)!;
}
Note that pathForLeaf is preferable when possible, as it does not require an O(n) scan of the tree, although it does require knowledge of where the item was originally placed.
The distinction between MerkleTree<n, T> and HistoricMerkleTree<n, T> is that check_root for the latter accepts proofs made against prior versions of the Merkle tree. This is helpful if a tree has frequent insertions, as these otherwise invalidate old proofs, although HistoricMerkleTree is not suitable if items are frequently removed or replaced, as this could lead to proofs being considered valid which should not be.
The commitment/nullifier pattern​
One powerful shielding pattern is to keep data in two different committed forms (referred to as "commitments" and "nullifiers"), with the former kept in a Merkle tree, and the latter in a Set. This lets us make single-use authentication tokens by first creating an entry in the Merkle tree and then when using it, proving its existence and adding the nullifier to a Set, asserting that it is not already there. This ensures that re-using the token isn't possible, while still not revealing which token was used. This is the underlying pattern of Zerocash and Zswap, which uses it to build shielded UTXOs.
It's crucial that the commitments and nullifiers use a domain separator to ensure they are not equal for the same secret data and, optionally, that creating the nullifier requires secret knowledge (as in the authenticating with hashes section), which ensures that the initial authorizer can't identify the token's use either.
Here's an example where public keys are authorized to increment a counter, once only:
import CompactStandardLibrary;


witness find_auth_path(pk: Bytes<32>): MerkleTreePath<10, Bytes<32>>;
witness secret_key(): Bytes<32>;


export ledger authorizedCommitments: HistoricMerkleTree<10, Bytes<32>>;
export ledger authorizedNullifiers: Set<Bytes<32>>;
export ledger restrictedCounter: Counter;


export circuit add_authority(pk: Bytes<32>): Void {
 authorizedCommitments.insert(pk);
}


export circuit increment(): Void {
 const sk = secret_key();
 const auth_path = find_auth_path(public_key(sk));
 assert authorizedCommitments.check_root(merkle_tree_path_root<10, Bytes<32>>(auth_path))
   "not authorized";
 const nul = nullifier(sk);
 assert !authorizedNullifiers.member(nul) "already incremented";
 authorizedNullifiers.insert(nul);
 restrictedCounter.increment(1);
}


circuit public_key(sk: Bytes<32>): Bytes<32> {
 return persistent_hash<Vector<2, Bytes<32>>>([pad(32, "commitment-domain"), sk]);
}


circuit nullifier(sk: Bytes<32>): Bytes<32> {
 return persistent_hash<Vector<2, Bytes<32>>>([pad(32, "nullifier-domain"), sk]);
Building blocks
Midnight's transaction structure is unique and may not be immediately intuitive. This section covers the structure of transactions, their effects, and what makes them tick.
Transactions​
In Midnight, transactions consist of:
                  * a 'guaranteed' Zswap offer
                  * an optional 'fallible' Zswap offer
                  * an optional contract calls segment, consisting of:
                  * a sequence of contract calls or contract deploys
                  * a cryptographic binding commitment (see: transaction integrity)
                  * a binding randomness (see transaction integrity).
Contract deployments​
A contract deployment creates a new contract if it does not already exist and fails otherwise. It is executed entirely as part of the 'fallible' execution step.
Contract deployment transaction parts consist of a contract state and a nonce, creating a new contract at the address that is a hash of the deploy part.
Contract calls​
A contract call invokes a specific contract address and entry point at this address. Entry points are keys into the contracts' operation map. Combined, the two select the verifier key that a contract call will be validated against.
A contract call declares a guaranteed and fallible transcript, which declares the visible effects of this call. It further contains a communication commitment, which may be used for cross-contract interaction.
info
Cross-contract interaction is still under development and is not available for use at this time. The team is keen to hear what kinds of interactions you would like to be able to do.
Finally, a contract call includes a zero-knowledge proof that the transcripts are valid for this contract and binding to other transaction elements.
Merging​
Zswap permits atomic swaps by allowing transactions to be merged. Currently, contract call sections cannot be merged, but two transactions can be merged if at least one of them has an empty contract call section. This outputs a new, composite transaction and has the effect of both input transactions combined.
Transaction integrity​
Midnight inherits the basic transaction integrity mechanism from Zswap, which, due to the ability to merge, uses Pedersen commitments for transaction integrity. These commitments commit to the value of each input and output of a transaction and are homomorphically summed before the whole transaction is checked for integrity by opening the composite commitment. Only people who created the individual components of the transaction know the opening randomnesses summed to decompose the transaction. This ensures a form of binding that guarantees that the user's funds are spent as they originally intended.
This binding is extended to contract calls by the contract call section contributing to the overall Pedersen commitment. This contribution is further restricted to carry no value vector, by requiring knowledge of an exponent of the generator, in the form of a Fiat-Shamir transformed Schnorr proof.
Zswap
info
The details of Midnight's native currency implementation are not yet stable and will undergo further revisions. The performance of basic operations has not been optimized at this time.
Zswap[^1] is a shielded token mechanism, based on Zerocash[^2], extended with native token support and atomic swaps. Zswap's basic component is an offer, which conceptually is a set of inputs and outputs. In this matter, it matches the UTXO model, although the set of unspent transactions itself is not computable due to the inability to link matching inputs and outputs, a property inherited from Zerocash.
This section describes a slight variation of Zswap used in Midnight that permits contracts to hold funds.
Offers​
A Zswap offer consists of four elements:
                  * a set of input coins (also called 'spends')
                  * a set of output coins
                  * a set of transient coins
                  * a balance vector.
Transient coins are coins that are both created and spent in the same transaction. This may seem superfluous, but it extends the ability for contracts to manage coins. Conceptually, this is an output immediately followed by an input, with the sole distinction that the input spends from a locally created coin commitment set, as opposed to the global one, to prevent index collisions.
The balance vector is a vector of the total value of this offer. Its dimensions are all possible token types, with each dimension carrying its own value. An input of a given type counts positively towards this vector and negatively towards an output. A balance vector is considered balanced if, for all dimensions, it is non-negative. Typically, it is adjusted before checking for balance, to account for token mints and fee deductions.
Outputs​
A Zswap output creates a new coin and places a corresponding commitment in a global Merkle tree. It consists of:
                  * the commitment itself
                  * a multi-base Pedersen commitment to the type/value vector
                  * an optional contract address, iff (if and only if) this output is targeted at a contract
                  * an optional ciphertext, if the output is toward a user that must receive it
                  * a zero-knowledge proof that the former are correct with respect to each other.
Outputs are valid if their zero-knowledge proof is verified.
Inputs​
A Zswap input spends an existing coin, by referencing (without revealing) its original commitment in the global Merkle tree and producing a corresponding (but unlinkable) nullifier. It consists of:
                  * the nullifier itself
                  * a multi-base Pedersen commitment to the type/value vector
                  * an optional contract address, iff the output is targeted at a contract
                  * a Merkle tree of a tree containing the commitment corresponding to the nullifier
                  * a zero-knowledge proof that the former are correct with respect to each other.
Inputs are valid iff the zero-knowledge proof verifies and the Merkle tree root is in the set of past roots.
Token types​
A token type in Midnight is a 256-bit collision-resistant hash output or the pre-defined zero value, which represents the native token. Users can issue their own tokens from contracts, with these token types being derived as a hash of the contract's address and a domain-separator given by the user.
[^1] Engelmann, F., Kerber, T., Kohlweiss, M., & Volkhov, M. 2022. Zswap: zk-SNARK based non-interactive multi-asset swaps. Proceedings on Privacy Enhancing Technologies (PoPETs) 4 (2022), 507-527. https://eprint.iacr.org/2022/1002.pdf
[^2] Ben-Sasson, E., Chiesa, A. Garman, C., Green, M., Miers, I., Tromer, E., & Virza, M. 2014. Zerocash: Decentralized Anonymous Payments from Bitcoin. 2014 IEEE Symposium on Security and Privacy, SP 2014, Berkeley, CA, USA, May 18-21, 2014, 459-474. https://eprint.iacr.org/2014/349.pdf
The Impact VM
info
Impact is still under active revision. Expect its attributes, including storage-related costs, to change.
Currently, users cannot write Impact manually; this feature may be added in the future.
On-chain parts of programs are written in Impact, our on-chain VM language. You should not need to worry about the details of impact when writing contracts; however, you may see it appear when inspecting transactions and contract outputs.
Impact is a stack-based, non-Turing-complete state manipulation language. A contract is executed on a stack containing three things:
                  * a 'context' object describing context related to the containing transaction
                  * an 'effects' object gathering actions performed by the contract during the execution
                  * the contract's current state.
Program execution proceeds linearly, with no operations being able to decrease the program counter and every operation being bounded in the time it takes. Program execution has an attached cost, which may be bounded by a 'gas' limit. Programs can either abort, invalidating this (part of) a transaction, or succeed, in which case they must leave a stack in the same shape as they started. The resulting effects must match the transcript's declared effects, and the contract state must be marked as storable, in which case it is adopted as the updated state.
Transcripts​
Execution transcripts consist of:
                  * a declared gas bound, used to derive the fees for this call
                  * a declared effects object, used to bind the contract's semantics to that of other parts
                  * the program to execute.
Values​
The Impact stack machine operates on the following state values:
                  * null
                  * <x: y>, a field-aligned binary cell
                  * Map { k1: v1, k2: v2, ... }, a map from field-aligned binary values to state values
                  * Array(n) [ v0, v1, ... ], an array of 0 < n < 16 state values
                  * MerkleTree(d) { k0: v1, k2: v2, ... }, a sparse, fixed-depth 1 <= d <= 32 Merkle tree, with the slots k0, k2, ..., containing the leaf hashes v1, v2, ... (typically represented as hex strings).
Field-aligned binary​
The basic data types used in Impact are 'field-aligned binary' (FAB) values. These values can store complex data structures in a binary representation while keeping the information necessary to encode them as field elements in any prime field.
Aligned values consist of a sequence of aligned atoms, each of which consists of a byte string and an alignment atom, where alignment atoms are one of:
                  * f, indicating a field alignment: the atom will be interpreted as a little-endian representation of a field element.
                  * c, indicating a compression alignment: the atom will be interpreted as a field element derived by hashing its value.
                  * bn, indicating an n-byte alignment: the atom will be interpreted as a sequence of field elements depending on the prime field and curve to compactly encode n bytes.
Programs​
A program is a sequence of operations, consisting of an opcode, potentially followed by a number of arguments depending on the specific opcode. Programs can be run in two modes: evaluating and verifying. In verifying mode, popeq[c] arguments are enforced for equality, while in evaluating mode, the results are gathered instead.
Each Op has a fixed effect on the stack, which will be written as -{a, b} +{c, d}: consuming items a and b being at the top of the stack (with a above b), and replacing them with c and d (with d above c). The number of values here is just an example. State values are immutable from the perspective of programs: a value on the stack cannot be changed, but it can be replaced with a modified version of the same value. We write [a] to refer to the value stored in the cell a. Due to the ubiquity of it, we write 'sets [a] := ...' for 'create a as a new cell containing ...'. We prefix an output value with a ' to indicate this is a weak value, kept solely in-memory, and not written to disk, and an input value with ' to indicate it may be a weak value. We use " and † to indicate that an input may be a weak value, and iff it is, the correspondingly marked output will be a weak value.
Where arguments are used, we use State for a state value, u21 for a 21-bit unsigned integer, and path(n) for a sequence of either field-aligned binary values, or the symbol stack, indicating keys to use in indexing, either directly, or to use stack values instead.
Name
	Opcode
	Stack
	Arguments
	Cost (unscaled)
	Description
	noop
	00
	-{} +{}
	n: u21
	n
	nothing
	lt
	01
	-{'a, 'b} +{c}
	-
	1
	sets [c] := [a] < [b]
	eq
	02
	-{'a, 'b} +{c}
	-
	1
	sets [c] := [a] == [b]
	type
	03
	-{'a} +{b}
	-
	1
	sets [b] := typeof(a)
	size
	04
	-{'a} +{b}
	-
	1
	sets [b] := size(a)
	new
	05
	-{'a} +{b}
	-
	1
	sets [b] := new [a]
	and
	06
	-{'a, 'b} +{c}
	-
	1
	sets [c] := [a] & [b]
	or
	07
	-{'a, 'b} +{c}
	-
	1
	sets `[c] := [a]
	neg
	08
	-{'a} +{b}
	-
	1
	sets [b] := ![a]
	log
	09
	-{'a} +{}
	-
	1
	outputs a as an event
	root
	0a
	-{'a} +{b}
	-
	1
	sets [b] := root(a)
	pop
	0b
	-{'a} +{}
	-
	1
	removes a
	popeq
	0c
	-{'a} +{}
	a: State only when validating
	`
	a
	popeqc
	0d
	-{'a} +{}
	a: State only when validating
	`
	a
	addi
	0e
	-{'a} +{b}
	c: State
	1
	sets [b] := [a] + c, where addition is defined below
	subi
	0f
	-{'a} +{b}
	c: State
	1
	sets [b] := [a] - c, where subtraction is defined below
	push
	10
	-{} +{'a}
	a: State
	`
	a
	pushs
	11
	-{} +{a}
	a: State
	`
	a
	branch
	12
	-{'a} +{}
	n: u21
	1
	if a is non-empty, skip n operations.
	jmp
	13
	-{} +{}
	n: u21
	1
	skip n operations.
	add
	14
	-{'a, 'b} +{c}
	-
	1
	sets [c] := [a] + [b]
	sub
	15
	-{'a, 'b} +{c}
	-
	1
	sets [c] := [b] - [a]
	concat
	16
	-{'a, 'b} +{c}
	n: u21
	1
	sets [c] = [b] ++ [a], if `
	concatc
	17
	-{'a, 'b} +{c}
	n: u21
	1
	as concat, but a and b must already be in-memory
	member
	18
	-{'a, 'b} +{c}
	-
	size(b)
	sets [c] := has_key(b, a)
	rem
	19
	-{a, "b} +{"c}
	-
	size(b)
	sets c := rem(b, a, false)
	remc
	1a
	-{a, "b} +{"c}
	-
	size(b)
	sets c := rem(b, a, true)
	dup
	3n
	-{x*, "a} +{"a, x*, "a}
	-
	1
	duplicates a, where x* are n stack items
	swap
	4n
	-{"a, x*, †b} +{†b, x*, "a}
	-
	1
	swaps two stack items, with n items x* between them
	idx
	5n
	-{k*, "a} +{"b}
	c: path(n)
	`
	c
	idxc
	6n
	-{k*, "a} +{"b}
	c: path(n)
	`
	c
	idxp
	7n
	-{k*, "a} +{"b, pth*}
	c: path(n)
	`
	c
	idxpc
	8n
	-{k*, "a} +{"b, pth*}
	c: path(n)
	`
	c
	ins
	9n
	-{"a, pth*} +{†b}
	-
	sum size(x_i)
	where pth* is {key_{n+1}, x_{n+1}, ..., key_1, x_1} set x'_{n+2} = a, x'_j = ins(x_j, key_j, cached, x'_{j+1}), b = x'_1. † is the weakest modifier of a and x_js, and cached set to false
	insc
	an
	-{"a, pth*} +{†b}
	-
	sum size(x_i)
	as ins, but with cached set to true
	ckpt
	ff
	-{} +{}
	

	1
	denotes boundary between internally atomic program segments. Should not be crossed by jumps.
	In the description above, the following short-hand notations are used. Where not specified, result values are placed in a Cell and encoded as FAB values.
                  * a + b, a - b, or a < b (collectively a op b), for applying op on the contents of cells a and b, interpreted as 64-bit unsigned integers, with alignment b8.
                  * a ++ b is the field aligned binary concatenation of a and b.
                  * a == b for checking two cells for equality, at least one of which must contain at most 64 bytes of data
                  * a & b, a | b, !a are processed as boolean and, or, and not over the contents of cells a and maybe b. These must encode 1 or 0.
                  * typeof(a) returns a tag representing the type of a state value:
                  * <a: b>: 0
                  * null: 1
                  * Map { ... }: 2
                  * Array(n) { ... }: 3 + n * 32
                  * MerkleTree(n) { ... }: 4 + n * 32
                  * size(a) returns the number of non-null entries is a Map, n for an Array(n) or MerkleTree(n).
                  * has_key(a, b) returns true if b is a key to a non-null value in the Map a.
                  * new ty creates a new instance of a state value according to the tag ty (as returned by typeof):
                  * cell: Containing the empty value.
                  * null for itself
                  * Map: The empty map
                  * Array(n): An array on n nulls
                  * MerkleTree(n): A blank Merkle tree
                  * a.get(b, cached) retrieves the sub-item indexed with b. If the sub-item is not loaded in memory, and cached is true, this command fails. For different a:
                  * a: Map, the value stored at the key b
                  * a: Array(n), the value at the index b < n
                  * rem(a, b, cached) removes the sub-item indexed (as in get) with b from a. If the sub-item is not loaded in memory, and cached is true, this command fails.
                  * ins(a, b, cached, c) inserts c as a sub-item into a at index c. If the path for this index is not loaded in memory, and cached is true, this command fails.
                  * root(a) outputs the Merkle-tree root of the MerkleTree(n) a.
Context and effects​
The context is an Array(_), with the following entries, in order:
caution
Currently, only the first two of these are correctly initialized!
                  1. A Cell containing the 256-bit aligned current contract's address.
                  2. A Map from CoinCommitment keys to 64-bit aligned Merkle tree indicies, for all newly allocated coins.
                  3. A Cell containing the block's 64-bit aligned seconds since the UNIX epoch approximation.
                  4. A Cell containing the block's 32-bit aligned seconds indicating the maximum amount that the former value may diverge.
                  5. A Cell containing the block's 256-bit hash.
This list may be extended in the future in a minor version increment.
The effects is an Array(_), with the following entries, in order:
                  1. A Map from Nullifiers to nulls, representing a set of claimed nullifiers.
                  2. A Map from CoinCommitments to nulls, representing a set of received coins claimed.
                  3. A Map from CoinCommitments to nulls, representing a set of spent coins claimed.
                  4. A Map from (Address, Bytes(32), Field) to null, representing the contract calls claimed.
                  5. A Map from Bytes(32) to cells of u64, representing coins minted for any specialization hash.
This list may be extended in the future in a minor version increment.
effects is initialized to [{}, {}, {}, {}, {}].
All of context and effects may be considered cached. To prevent cheaply copying data into the contract state with as little as two opcodes, both are flagged as weak, and any operations performed with them. If the final state' is tainted, the transaction fails, preventing this from being directly copied into the contract's state.
Transaction semantics
Ledger states​
Midnight's ledger consists of two items:
                  * Zswap's state
                  * a Merkle tree of coin commitments
                  * an index to the first free slot of the coin commitment tree
                  * a set of nullifiers
                  * a set of valid past Merkle tree roots
                  * a map from contract addresses to contract states.
Contract state​
A contract state consists of:
                  * an Impact state value
                  * a map of entry point names to operations, where entry points correspond to exported circuits in a contract.
A contract operation consists of a Snark verifier key that is used to validate contract calls made against this contract and entry point.
Transaction fallibility​
Transactions execute in three stages:
                  * well-formedness check
                  * guaranteed phase
                  * fallible phase.
The well-formedness check is run without any state and checks the general integrity and consistency of the transaction. In contrast, both the guaranteed and fallible phases are run against the ledger state and either produce a new state or fail. If a transaction fails during the guaranteed phase, it is not included in the ledger. If it fails during the fallible phase, any effects of the guaranteed phase still apply, and the ledger will record the transaction as a partial success.
The fees for all phases of execution are collected in the guaranteed phase and are forfeited if a transaction fails in the fallible phase.
Well-formedness​
The well-formedness check verifies that a transaction is in a canonical format, and that:
                  * all zero-knowledge proofs in Zswap offers can be verified
                  * the Schnorr proof in the contract section can verified
                  * the guaranteed offer is balanced with respect to the following adjustments:
                  * subtraction of the fees of the entire transaction
                  * addition of any mints performed in guaranteed transcripts
                  * the fallible offer is balanced with respect to the following adjustment:
                  * Addition of any mints performed in fallible transcripts
                  * each contract-owned input or output is claimed exactly once by the same contract in the effects section of the transcript matching the fallibility of the offer it appears in
                  * any outputs claimed as being created by a contract in the effects section of a transcript are claimed at most once, and they appear in the offer matching the fallibility of the transcript
                  * any contract calls that are claimed in a transcript are present and claimed at most once
                  * if a contract call has both a guaranteed and fallible section, the fallible section starts with a ckpt operation.
Phase execution​
Other than the notes in the transaction fallibility section, the guaranteed and fallible phases operate similarly, except that the following additional work is performed in the guaranteed phase:
                  * contract operations for all calls are looked up, and the zero-knowledge proofs are verified against them
                  * the fallible Zswap section is also applied during the guaranteed section, to ensure that it cannot invalidate the fallible section by itself. [^1]
Then:
                  1. The phase's Zswap offer is applied, by inserting new commitments into the Merkle tree and nullifiers into the nullifier set (aborting if they are already present), checking that the Merkle roots used are valid past roots (aborting otherwise), and updating the past roots set
                  2. The above additional checks for the guaranteed phase are performed, if applicable
                  3. For each contract call in sequence, the transcript relevant to this execution phase is applied
                  1. The contract's current state is loaded
                  2. The context is set up from the transaction
                  3. The Impact program is executed against the context, an empty effects set, the transcript program, and the declared gas limit, in verification mode
                  4. The resulting effects are tested to be equal to the declared effects
                  5. The resulting state is stored as the contract's state, iff it is "strong".
[^1] This would permit invalidating any fallible section by merging with an invalid spend otherwise.
________________


Guides
Midnight wallet - developer guide
There are many flavors of wallet software - browser extensions, wallets used in various backend systems, CLI apps, wallets integrated into testing environments, etc. In Midnight, they all need to implement common functionalities, like:
                  * deriving keys
                  * deriving token balance from chain data
                  * managing coins and data needed to generate necessary zero-knowledge proofs
                  * managing connection with an indexer instance
                  * creating token transfers and balancing transactions (i.e. paying fees for a contract call), including proof generation requests
It all, to implement robustly, is a non-trivial amount of work. For that reason, there are a couple of packages available to help with integration of wallet functionality:
                  * @midnight-ntwrk/wallet-api - high-level wallet interfaces, target abstraction to be used by code utilizing wallet functionality (e.g. browser extension implementation);
                  * @midnight-ntwrk/wallet - implementation of the @midnight-ntwrk/wallet-api, with some additional tools and helpers
                  * @midnight-ntwrk/zswap - reference implementation of building blocks of Zswap
                  * @midnight-ntwrk/dapp-connector-api - description of the API meant to be injected by browser extensions to enable DApp connections.
Installing​
The Midnight wallet is provided as an NPM package @midnight-ntwrk/wallet. You can install it using any node package manager, including Yarn. To install the package using Yarn, run the following command:
yarn add @midnight-ntwrk/wallet
Important information​
The wallet uses the @midnight-ntwrk/zswap library to manage its local state and construct transactions. The serialization format, which ensures transactions are processed correctly depending on the network (eg, TestNet or MainNet) they belong to, relies on the NetworkId provided when building the wallet.
________________


Managing wallet instances​
The @midnight-ntwrk/wallet package offers a builder that enables you to create wallets in various ways. Once created and started, each wallet will automatically connect to the specified node for submitting transactions, indexer for state synchronization, and proving server for generation of zero-knowledge proofs.
To create a wallet instance, begin by importing the builder from the @midnight-ntwrk/wallet package:
import { WalletBuilder } from '@midnight-ntwrk/wallet';
Next, the builder can be used to build instances:
                  * from seed
                  * from state snapshot
                  * random, disposable ones
Creating instance from a seed​
The wallet builder offers a method that enables you to instantiate a wallet with a specific seed, resulting in obtaining the same address and keys but with a fresh state that is then synchronized with the indexer. The method requires the following parameters (in the exact order):
Name
	Data type
	Required?
	Default
	Indexer URL
	String
	Yes
	N/A
	Indexer WebSocket URL
	String
	Yes
	N/A
	Proving server URL
	String
	Yes
	N/A
	Node URL
	String
	Yes
	N/A
	Seed
	String
	Yes
	N/A
	Network ID
	NetworkId
	Yes
	N/A
	Log level
	LogLevel
	No
	warn
	Discard Transaction History
	Boolean
	No
	false
	


import { WalletBuilder } from '@midnight-ntwrk/wallet';
import { NetworkId } from '@midnight-ntwrk/zswap';


const wallet = await WalletBuilder.buildFromSeed(
 'https://indexer.testnet-02.midnight.network/api/v1/graphql', // Indexer URL
 'wss://indexer.testnet-02.midnight.network/api/v1/graphql', // Indexer WebSocket URL
 'http://localhost:6300', // Proving Server URL
 'https://rpc.testnet-02.midnight.network', // Node URL
 '0000000000000000000000000000000000000000000000000000000000000000', // Seed
 NetworkId.TestNet,
 'error' // LogLevel
);
Creating a random, disposable instance​
Use the WalletBuilder.build function to create a brand-new wallet instance. There won't be a way to access its private keys, thus - such kind of instance is really only useful for ad-hoc wallets used in testing. This requires the following parameters (in the precise order):
Name
	Data type
	Required?
	Default
	Indexer URL
	String
	Yes
	N/A
	Indexer WebSocket URL
	String
	Yes
	N/A
	Proving server URL
	String
	Yes
	N/A
	Node URL
	String
	Yes
	N/A
	Network ID
	NetworkId
	Yes
	N/A
	Log level
	LogLevel
	No
	warn
	Discard Transaction History
	Boolean
	No
	false
	


import { WalletBuilder } from '@midnight-ntwrk/wallet';
import { NetworkId } from '@midnight-ntwrk/zswap';


const wallet = await WalletBuilder.build(
 'https://indexer.-02.midnight.network/api/v1/graphql', // Indexer URL
 'wss://indexer.testnet-02.midnight.network/api/v1/graphql', // Indexer WebSocket URL
 'http://localhost:6300', // Proving Server URL
 'https://rpc.testnet-02.midnight.network', // Node URL
 NetworkId.TestNet, // Network ID
 'error' // LogLevel
);
State snapshots​
The wallet state can be serialized, allowing it to be stored and later re-instantiated from that serialized checkpoint, so wallet synchronization can restart from that point.
This functionality is especially valuable in scenarios like browser extensions, where it's crucial to swiftly restore the wallet state for the user.
To serialize the state to restore from, use the serialize() method.
The serialized state contains a lot of data, which is meant to be kept private. For that reason it should be stored securely.
To create a wallet instance from the serialized state use method WalletBuilder.restore. This method requires the following parameters (in the precise order):
Name
	Data type
	Required?
	Default
	Indexer URL
	String
	Yes
	N/A
	Indexer WebSocket URL
	String
	Yes
	N/A
	Proving server URL
	String
	Yes
	N/A
	Node URL
	String
	Yes
	N/A
	Serialized state
	String
	Yes
	N/A
	Log level
	LogLevel
	No
	warn
	Discard Transaction History
	Boolean
	No
	false
	Note that this builder method doesn't provide a network ID parameter, because it is stored in the serialized snapshot.
The example below shows how to prepare a state snapshot and later restore wallet from it:

import { WalletBuilder } from '@midnight-ntwrk/wallet';


const originalWallet = await WalletBuilder.build(/* ... */);


// start the wallet, use it, etc.


const serializedState = await originalWallet.serialize();


const wallet = await WalletBuilder.restore(
 'https://indexer.testnet-02.midnight.network/api/v1/graphql', // Indexer URL
 'wss://indexer.testnet-02.midnight.network/api/v1/graphql', // Indexer WebSocket URL
 'http://localhost:6300', // Proving Server URL
 'https://rpc.testnet-02.midnight.network', // Node URL
 serializedState,
 'error' // LogLevel
);
Wallet instance lifecycle​
Creating a wallet does only initialize its internal state.
To begin synchronizing the wallet with the indexer, use the start() method on wallet instance:
wallet.start();
To gracefully close a wallet instance, use the close() method:
await wallet.close();
Returned promise will resolve after all resources used for synchronization are released.
Accessing the wallet state​
The wallet state is provided through an rx.js observable. You can operate on the state value using various operators supported by rx.js. The simplest use is to simply log the state upon each change:

wallet.state().subscribe((state) => {
 console.log(state);
});
Working with transactions​
Conceptually, preparing a transaction and submitting it to network is done in 3 steps:
                  1. Prepare an unproven transaction - outline of transaction to be created
                  2. Compute needed zero-knowledge proofs and convert outline into the final transaction
                  3. Submit the transaction
note
It is important to ensure that wallet's synchronization progress has reached the tip of the chain before preparing a transaction. Otherwise, there is a very likely possibility of spending a coin, which was already spent, but wallet instance has not learned that fact yet, and in turn - node rejecting the transaction because of detected double spend attempt.
Preparing transaction - making a transfer​
The wallet API includes a transferTransaction() method that enables you to construct transactions specifying the token type, amount, and recipient address.
This method requires an array of objects containing the following properties:
Name
	Data type
	Required?
	amount
	BigInt
	Yes
	tokenType
	TokenType
	Yes
	receiverAddress
	Address
	Yes
	Below, you can see an example of how you can utilize the API:
import { nativeToken } from '@midnight-ntwrk/zswap';


const transferRecipe = await wallet.transferTransaction([
 {
   amount: 1n,
   receiverAddress: '<midnight-wallet-address>',
   tokenType: nativeToken() // tDUST token type
 }
]);
Preparing transaction - balancing an existing transaction​
Balancing an existing transaction is particularly useful, when working with DApps or complementing a swap. It is a process, where transaction is inspected for imbalances between values of provided inputs and outputs, and then a complementary transaction is created, which provides or extracts value (by adding inputs or outputs) needed to pay fees and reduce imbalances. It can be done with balanceTransaction method, which requires the following parameters:
Name
	Data type
	Required?
	transaction
	Transaction
	Yes
	newCoins
	CoinInfo[]
	No
	note
The newCoins parameter is intended for cases where a new coin is created, such as when a DApp mints one and intends to send it to the wallet. Due to the nature of the Midnight TestNet, these newly created coins must be explicitly provided to the wallet using this method. This allows the wallet to monitor and incorporate them into its state effectively.
const balancedRecipe = await wallet.balanceTransaction(transaction);
Proving a transaction​
Once unproven transaction is ready - it can be proven. Wallet does wrap the results of transferTransaction and balanceTransaction into objects called ProvingRecipe - they allow passing the results of these methods directly to proveTransaction method, without conditional logic between to decide what exactly needs to be proven and merged. It takes following parameters:
Name
	Data type
	Required?
	provingRecipe
	ProvingRecipe
	Yes
	For example, the transferRecipe created above has a following shape and can be proven like below:
import { TRANSACTION_TO_PROVE } from '@midnight-ntwrk/wallet-api';


const recipe = {
 type: TRANSACTION_TO_PROVE, // available from the Wallet API
 transaction: anUnprovenTransferTransaction // this is a balanced, unproven transaction
};


const provenTransaction = await wallet.proveTransaction(recipe);

note
Computing zero-knowledge proofs is a very computationally heavy operation. For that reason one needs to expect that calls to proveTransaction take tens of seconds. This is also reason why a proving server is needed at this moment - running native code makes the zero-knowledge technology feasible to use in Midnight.
Submitting a transaction​
Once final, proven transaction is created, it can be submitted. To submit a transaction, you need to use the submitTransaction method, which requires the following parameters:
Name
	Data type
	Required?
	transaction
	Transaction
	Yes
	The transaction must be balanced (value of tokens in inputs needs to be at least equal to value of tokens in output, as well as cover fees) and proven for it to be accepted by the node.
The example below uses the provenTransaction from the section above:
const submittedTransaction = await wallet.submitTransaction(provenTransaction);
Connecting to a DApp​
See the DApp connector overview and Wallet Provider for more details. The former is the API expected to be injected by a browser extension wallet, the latter is interface used by Midnight.js to interact with wallet.
Examples​
In this section, you'll find examples of how you can fully utilize the wallet APIs.
Transferring tDUST​
This example instantiates a new wallet and uses it to transfer one tDUST to another wallet:

import { WalletBuilder } from '@midnight-ntwrk/wallet';
import { NetworkId, nativeToken } from '@midnight-ntwrk/zswap';


try {
 const wallet = await WalletBuilder.build(
   'https://indexer.testnet-02.midnight.network/api/v1/graphql',
   'wss://indexer.testnet-02.midnight.network/api/v1/graphql',
   'http://localhost:6300',
   'https://rpc.testnet-02.midnight.network',
   NetworkId.TestNet
 );


 wallet.start();


 const transferRecipe = await wallet.transferTransaction([
   {
     amount: 1n,
     tokenType: nativeToken(), // tDUST token type
     receiverAddress: '2f646b14cbcbfc43ccdae6379891c2b01e9731d1e4c1e0c1b71c04b7948a3e0e|010001f38d17a48161d6248ee10a799dca0799eecbd8f1f20bbeb4eb2645656c104cde'
   }
 ]);


 const provenTransaction = await wallet.proveTransaction(transferRecipe);


 const submittedTransaction = await wallet.submitTransaction(provenTransaction);


 console.log('Transaction submitted', submittedTransaction);
} catch (error) {
 console.log('An error occurred', error);
}
Nodes and DApps
Node endpoints
You have the option to run your own node for interacting with the Midnight network via various user interfaces (UIs) and programmatically. Alternatively, you can connect to public endpoints provided by infrastructure and API service providers. For development convenience, you may use the following public endpoints. These endpoints can be utilized with APIs to interact with the Midnight network and its test environments.
Network endpoints​
Testnet network​
Network
	URL
	Testnet
	https://rpc.testnet-02.midnight.network/
	Explorer (temporary)
	https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.testnet-02.midnight.network#/explorer
	Example query of a Midnight node:

curl -X POST \
 -H "Content-Type: application/json" \
 -d '{
       "jsonrpc": "2.0",
       "method": "system_chain",
       "params": [],
       "id": 1
     }' \
 https://rpc.testnet-02.midnight.network/
Query available RPC methods into a readable file rpc_methods.json:

curl \
 -H "Content-Type: application/json" \
 -d '{"jsonrpc":"2.0","method":"rpc_methods","params":[],"id":1}' \
 https://rpc.testnet-02.midnight.network/ \
 > rpc_methods.json
Insomnia API Collection​
 insomnia_app_screenshot 

To facilitate interaction with the Midnight Node, we have prepared an Insomnia API collection. This collection contains pre-configured requests that you can use to test and interact with the node's various endpoints.
                  1. Download the collection
                  * Click on the following link to download the Insomnia API collection file: 📦⬇ Midnight Node Insomnia Collection .
                  2. Open Insomnia
                  * If you haven't already installed Insomnia, download and install it from Insomnia's official website.
                  3. Import the collection
                  * Open Insomnia.
                  * Go to the main menu and select Import/Export.
                  * Choose Import Data > From File.
                  * Locate and select the downloaded Insomnia.json file.
                  4. Use the collection
                  * Once imported, you will see the Midnight Node collection in your Insomnia workspace.
                  * Expand the collection to view and utilize the available requests.
                  * Configure any necessary environment variables if prompted, such as API keys or server URLs.
Getting help
As a participant in the Midnight Testnet, you have the opportunity to shape the future of Midnight by reporting issues, suggesting enhancements, and directly influencing the development process.
Connectivity failures, bugs, general problems, and suggestions​
There are two ways to report problems, make suggestions, give feedback, or just ask for help:
                  1. Participate in a discussion on the Midnight Discord server. The Midnight team will be monitoring the #support channel regularly. Important: when you first join the Midnight Discord server, you must accept the rules in the #rules before you can access other content on the server.
                  2. Send email to Midnight support.
Security vulnerabilities​
If you discover any security vulnerabilities in the Midnight libraries or infrastructure, please report them using the following protocol:
                  1. Do not post security vulnerabilities on the support channel on Discord.
                  2. Instead, please send a report of what you have found to the Midnight support email address: support@midnight.network. If you have a fix or workaround for the vulnerability, please describe that, too.
                  3. The Midnight team will evaluate your report and may release a fix or publish instructions for mitigating the vulnerability. The team will inform you of the outcome directly.
                  4. Unless you request otherwise, the Midnight team will credit you for finding the problem in any publication of a fix or mitigation.
                  5. After the Midnight team has either published a fix or informed you that the vulnerability will not be addressed, you are free to disclose it publicly.
FAQ
General questions​
Is there a Midnight white paper?​
There is no Midnight white paper, but the research paper 'Kachina – Foundations of Private Smart Contracts', written by researchers Thomas Kerber et al. at the University of Edinburgh, describes the underlying cryptography and Universal Composition model powering the Midnight network. Read more about the architecture and concepts in the 'Learn' section.
What tokens are available for use on Testnet? Are there gas fees?​
Testnet uses only one token: test DUST (tDUST), which is a test token used for Midnight Testnet testing purposes only. Visit the token acquisition page to find out more. This may change in future versions of Midnight, and may include the calibration of the gas fees against the amount work performed by a computation.
Developer questions​
Where do I go if I need help troubleshooting my code?​
The Getting help section of this site describes multiple ways to communicate with the Midnight team and your fellow developers. Your questions, including those about troubleshooting your code, are welcome.
What types of DApps can I build on the Midnight Testnet?​
Theoretically, any DApp that does not require one contract to call another from within its circuits. This includes private payment DApps, private auction DApps, and DApps that enable shielded identity verification.
What types of DApps can not yet be built on Testnet?​
DApps that require an oracle (for pricing data info or other external data), such as a DeFi lending DApp requiring Bitcoin pricing data.
Can I reuse Solidity code on Midnight?​
No, Midnight DApps are created in TypeScript and Compact, a custom programming language, to build zero-knowledge circuits that generate privacy proofs.
What are the key unique concepts or coding patterns I need to know to create DApps on Midnight?​
One of the key ideas in Midnight is the distinction between information that you want to place in the public record and information that you want to keep private. For example, the assertion that someone is over 25 might be useful to place in the public space of a contract, while the details of the person's birthday and precise age might be kept private. This kind of thinking about what is truly needed in the public sphere is a core aspect of Midnight programming.
After writing the contract in Midnight’s contract language, the DApp is written in standard TypeScript. This implies that the coding experience of existing JavaScript and TypeScript programmers can be applied to creating Midnight DApps.
How does Midnight work at a high level?​
See the tutorial's introductory material and the section of this site about How Midnight works. You can also read more about Midnight's architecture and concepts in the 'Learn' section.
What is the current Testnet block time (time to finality)?​
Testnet block time is 6 seconds. This time is governed by network parameters that are subject to adjustment. Finality will occur typically one or two blocks after block creation (so within 18 seconds).


________________


Become a Midnight Block Producer
This documentation is designed to guide you through the process of becoming a Midnight Block Producer (BP). A BP is responsible for producing new blocks in the Midnight blockchain. BPs play a key role in maintaining the integrity, security, and functionality of the blockchain.
 Video thumbnail: How to Become a Midnight Block Producer on Midnight Testnet 

Prerequisites​
Must-have skills​
                  * Proficiency in setting up, running, and monitoring blockchain nodes consistently
                  * Proficiency in CLI usage, system administration, and networking
                  * Experience with blockchain technologies, especially Cardano stake pool operations
Nice-to-have skills​
                  * Familiarity with scripting languages (e.g., Bash, Python) for automation
                  * Understanding of security best practices for blockchain infrastructure
Must-have gear​
                  * Reliable internet connection with minimal downtime. 50 MB/s or more is sufficient.
                  * Adequate hardware to run a full node (CPU, RAM, and storage requirements as per the latest documentation)
Nice-to-have gear​
                  * Redundant internet connection to ensure high availability
                  * Backup power supply to prevent downtime during power outages
info
There is no slashing if one is offline; there is only the opportunity cost of not receiving additional block rewards.
info
To let Midnight evolve without resetting the chain, new versions of node software might introduce changes requiring a hard- or soft-fork. To handle such situations smoothly, a validator node running a compatible version of the software, will start including such information in blocks produced. When a configured threshold of blocks containing this information is reached - the changes will be scheduled, and then enabled by means of a runtime upgrade.
Overview of validator infrastructure​
This is an example of validator infrastructure. Validators may orchestrate infrastructure based on their preferences.
Explainer​
                  * Cardano Stake Pool (SPO): Represents an individual or group of stakeholders pooling their resources to participate in the Cardano network. At a minimum, an SPO operates a Cardano Block Producer (BP) node and one or more Cardano Relay nodes.
                  * Cardano Block Producer Node: Responsible for creating new blocks on the Cardano blockchain.
                  * Cardano DB Sync: Follows the Cardano chain and take information from the chain and an internally maintained copy of ledger state. Data is then extracted from the chain and inserted into a PostgreSQL database
                  * Cardano Relay node: Relays information between different nodes in the Cardano network, ensuring connectivity and dissemination of data. **: Synchronizes data between PostgreSQL and Cardano network.[a][b]
                  * Kupo: Kupo is fast, lightweight and configurable chain-index for the Cardano blockchain that facilitates communication with the Midnight partnerchain scripts that reside on Cardano.
                  * Midnight Validator Node: Validates transactions and blocks within the Midnight blockchain.
                  * Ogmios: Facilitates communication between Cardano nodes and external applications.
                  * PostgreSQL: A relational database used to allow the Midnight validator node to read operations on the Cardano network.
System requirements and software​
Most node operators manage their servers and infrastructure remotely from their workstations. Currently, Mac and Linux are the recommended and tested operating systems for this purpose. If you are using a Windows workstation, then use Windows Subsystem for Linux (WSL) for compatibility.
If you are using WSL, then please use:
                  * Ubuntu 22.04 (or equivalent)
                  * GLIBC 2.35
Check current GLIBC version in WSL:

ldd --version
Docker is a key tool utilized throughout this guide. We recommend installing Docker on both workstations and servers to streamline container management. Docker simplifies the deployment, scaling, and management of applications by packaging them into standardized units called containers, making it easier to maintain consistency across different environments.
                  * Visit the official Docker website to get Docker.
Public endpoints​
Midnight requires Ogmios and Kupo. While you may run Ogmios and Kupo locally, we provide public endpoints for these services.
                  * ogmios.preview.midnight.network
                  * kupo.preview.midnight.network
Service Compatibility and System Requirements Reference​
These are estimated system requirements for each service used within Midnight validator infrastructure.
Here's the updated table with the versions filled in:
Service
	Version
	Quantity
	CPU testnet
	CPU mainnet
	Memory testnet
	Memory mainnet
	Storage testnet
	Storage mainnet
	Cardano DB Sync
	13.5.0.2
	1
	4 VCPU
	4 VCPU
	32 GB RAM
	32 GB RAM
	20 GB free[c]
	320 GB free
	Cardano Node
	10.1.2
	2
	2 VCPU
	4 VCPU
	4 GB RAM
	16 GB RAM
	20 GB free
	250 GB free
	PostgreSQL
	15.5
	1
	0.5 VCPU
	1 VCPU
	1 GB RAM
	1 GB RAM
	-
	-
	Midnight Node
	0.7.0
	1
	4 VCPU
	8 VCPU
	16 GB RAM
	32 GB RAM
	40 GB free
	TBD
	Kupo
	2.9.0[d]
	1
	2 VCPU
	4 VCPU
	0.25 - 2 GB RAM
	2 - 4 GB RAM
	5 GB free
	12 GB free
	Ogmios
	6.5.0[e]
	1
	0.5 VCPU
	1 VCPU
	1 GB RAM
	2 GB RAM
	-
	-
	Example Server Architecture​
FirewallFirewallFirewallFirewallInternetCardano Node Server 1Cardano Node Server 2Partner-Chain-Dependencies ServerMidnight Node ServerCardano DB SyncPostgreSQLKupoOgmios
Here's a textual description of an example server architecture tailored for the Cardano Preview testnet and Midnight Testnet:
1. Cardano Node Servers for Stake Pool Operation (x2)​[f]
Purpose:
                  * To run the Cardano nodes as an SPO on the Cardano environment.
Server Specifications:
                  * CPU: 2 VCPU (testnet recommendation)
                  * Memory: 4 GB RAM (testnet recommendation)
                  * Storage: 20 GB SSD (testnet recommendation)
                  * OS: A Linux distribution (e.g., Ubuntu 22.04 LTS)
                  * Software: Cardano Node configured for testnet
2. Partner-Chain-Dependencies Server​
Purpose:
                  * To host all partner-chain auxiliary services needed for Midnight validator operations.
Server Specifications:
                  * CPU: 4 VCPU (Combining minimal requirements for all services on testnet)
                  * Memory: 16 GB RAM (To handle DB Sync, PostgreSQL, and other services comfortably)
                  * Storage: 100 GB SSD (Considering DB Sync's lower storage need on testnet plus buffer)
                  * OS: A Linux distribution (e.g., Ubuntu 22.04 LTS)
                  * Software:
                  * Cardano DB Sync v13.5.0.2
                  * PostgreSQL v15.3
                  * Kupo v2.9.0
                  * Ogmios v6.8.0
3. Midnight Node Server​
Purpose:
                  * To run the Midnight Node in validator mode.
Server Specifications:
                  * CPU: 4 VCPU (testnet recommendation)
                  * Memory: 16 GB RAM (testnet recommendation)
                  * Storage: 40 GB SSD (testnet recommendation)
                  * OS: A Linux distribution (e.g., Ubuntu 22.04 LTS)
                  * Software: Midnight Node (version as per current development or testing phase)
Network and Security Considerations for Testnet:​
                  * Firewall and Security: Basic firewall setup with ufw or similar, less stringent than mainnet but still secure for testing purposes.
                  * Network: Reliable internet connection, though high-speed might not be as critical as for mainnet. Dynamic IPs might be acceptable for testnet nodes unless static IPs are required for specific tests.
                  * Backup: Less frequent backups might be necessary, but still advisable for important test configurations or data.
Scalability in Testnet:​
                  * Flexibility: Testnet environments should be flexible to quickly scale up or down based on testing needs. Cloud services could be ideal for this due to their scalability.
                  * Testing New Features: This setup allows for testing new versions or configurations of software without risking mainnet operations.
This testnet architecture focuses on providing a stable yet flexible environment for development, testing, and validation of stake pool operations and new features before they are deployed to the mainnet. The specifications are generally lower due to the experimental nature of the testnet, where the economic stakes are not as high.


Step 1. Begin operating a Cardano Stake Pool
Midnight serves as a partner-chain to Cardano, presenting a distinctive opportunity for Cardano Stake Pool Operators (SPOs) to uphold the decentralization and security of Midnight. For SPOs interested in producing blocks for Midnight, they must register as candidates in the validator committee for the Midnight partner-chain.
To embark on the path of becoming a Midnight validator, one must either be, or become, a Cardano stake pool operator (SPO) within a Cardano environment that is supported for this role.
Supported environments​
Cardano env.
	Status
	Midnight env.
	preview
	✅
	testnet
	preprod
	❌
	N/A
	mainnet
	❌
	N/A
	1a. Become a Cardano SPO​
Requirements​
                  1. Cardano node version 10.1.2. Please use this version.
                  2. 500 tAda + fee for stake pool pledge.
                  3. A UTXO for the Midnight validator registration fee, with its payment.skey.
                  4. SPO cold.skey will also be needed within the Midnight validator registration process.
                  5. Air-gapped device for secret storage (optional for testnets).
info
Use regular Ed25519 keys. Extended Ed25519 keys are not supported at this time.
Block producing nodeRelay nodeStake pool
Useful Cardano stake pool operation resources​
                  * Cardano Handbook - A comprehensive guide covering everything from running a Cardano node to managing a stake pool. This is highly recommended for new Stake Pool Operators (SPOs) to grasp the fundamentals.
                  * Guild Operators SPO Toolkit - A resourceful toolkit designed to expedite the setup and management of a Stake Pool Operator. Perfect for those with some technical background who want to dive straight into practical operation without extensive reading.
________________


                  * Preview testnet configuration files
                  * Testnets faucet to request tADA


Step 2. Setup partner-chain dependencies
Now that a Cardano SPO is set up, it is time to configure partner-chain dependencies such as Ogmios, Kupo, Cardano-db-sync, Postgres, and Cardano-node. To simplify the process, a compose-partner-chains.yml file is provided to easily start these services using Docker Compose. Alternatively, one may choose to build these dependencies from source.
Minimum system requirements​
See Partner-chain dependencies server requirements.
Important notice for Ubuntu users:​
Ubuntu sometimes ignores Docker's UFW rules, which can compromise your server's security. To address this:
                  * Enable Docker to Work with UFW: Run sudo apt-get install docker-compose ufw followed by sudo ufw allow 22/tcp for SSH access, and sudo ufw allow 80/tcp if you're exposing web services.
                  * Configure Docker to Use UFW: Add these lines to /etc/docker/daemon.json:

{
 "iptables": false
}
                  * Then, restart Docker with sudo systemctl restart docker.
                  * Verify: After setup, ensure your firewall rules are in place by running sudo ufw status.
2a. docker-compose up Partner-chain dependencies​
                  1. Clone the midnight-node-docker repo and navigate to compose-partner-chains.yml file:
git clone git@github.com:midnight-ntwrk/midnight-node-docker.git
cd midnight-node-docker
                  2. 
Edit compose-partner-chains.yml file:
                     * Edit the compose-partner-chains.yml file using VSCode or a shell editor such as vim.
                     3. For example, with vim:
vim compose-partner-chains.yml
                     * Enter I key to enter insert mode.
                     * Navidate using arrow keys and locate POSTGRESS environment variables.
- POSTGRES_HOST=postgres
- POSTGRES_PORT=5432
- POSTGRES_DB=cexplorer
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=password123
danger
You must change default POSTGRES values, especially POSTGRES_PASSWORD and POSTGRES_USER to a more secure username and password.
                     * If using vim editor, make changes, then ESC + :wq to save changes to file.
                     3. docker-compose up partner-chain dependencies:
                     * Within the same directory as the compose-partner-chains.yml, launch partner-chain dependencies in detatched mode.
docker compose -f compose-partner-chains.yml up -d
                     4. Example output:
[+] Running 5/5
✔ Container postgres      H...                                 5.7s
✔ Container cardano-node  Started                              0.1s
✔ Container ogmios        Sta...                               0.2s
✔ Container kupo          Start...                             0.2s
✔ Container db-sync       St...                                5.8s

                     5. important
                     6. Allow partner-chain dependencies to sync 100% with the Cardano network. See the next step for monitoring these services.
2b. Manage and monitor partner-chain dependencies​
                     1. Verify status of services and ports:
                     * List active Docker containers along with their status, ports, and container IDs:
docker container list
                     2. Example output:
CONTAINER ID   IMAGE                                           COMMAND                  CREATED         STATUS                   PORTS                                       NAMES
aeddf39b71f7   ghcr.io/intersectmbo/cardano-db-sync:13.5.0.2   "/nix/store/mvypj83y…"   9 minutes ago   Up 9 minutes                                                         db-sync
61a6eb0ed321   cardanosolutions/ogmios:v6.5.0                  "/bin/ogmios --node-…"   9 minutes ago   Up 9 minutes (healthy)   0.0.0.0:1337->1337/tcp, :::1337->1337/tcp   ogmios
b514a818da45   postgres:15.3                                   "docker-entrypoint.s…"   9 minutes ago   Up 9 minutes (healthy)   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   db-sync-postgres
558d2b49eddc   ghcr.io/intersectmbo/cardano-node:10.1.2        "entrypoint"             9 minutes ago   Up 9 minutes             0.0.0.0:3001->3001/tcp, :::3001->3001/tcp   cardano-node

                     3. View logs of specific containers:
To view logs of a particular container, use docker logs followed by the container name or ID:
docker logs db-sync
docker logs kupo
docker logs ogmios
docker logs db-sync-postgres
docker logs cardano-node

                        4. Replace db-sync, ogmios, etc., with the actual container names or container IDs you want to inspect.
                        5. Useful docker-compose commands:
To learn more about Docker Compose, visit the official Docker Compose documentation. However, here are some common commands:
docker-compose stop # stop containers
docker-compose start # start containers
docker-compose restart # restart containers
docker-compose down # stop and remove containers
docker-compose stats # display resource usage statistics

                           6. Monitor Ogmios service:
                           * View Ogmios dashboard at http://localhost:1337/. If Ogmios is running on a remote service then simply visit http://x.x.x.x:1337 in a browser with the respective IP address and PORT.
                           * Query Ogmios healthcheck:
curl -s localhost:1337/health | jq '.'
                           7. 
Monitor Kupo service:
                              * Query Kupo healthcheck:
curl -X GET http://localhost:1442/health
                              8. 
Query Cardano-db-sync synchronization progress:
                                 * Using psql directly:
If you don’t already have the PostgreSQL client installed, you can install it using:
sudo apt-get install postgresql-client
                                    * Log in to PostgreSQL shell using psql:
psql -h localhost -U postgres -d cexplorer -p 5432
                                    * Optionally, log in to PostgreSQL shell using docker:
docker exec -it db-sync-postgres psql -U postgres -d cexplorer
                                    * Then, run the following query inside the PostgreSQL shell:
SELECT 100 * (
   EXTRACT(EPOCH FROM (MAX(time) AT TIME ZONE 'UTC')) -
   EXTRACT(EPOCH FROM (MIN(time) AT TIME ZONE 'UTC'))
) / (
   EXTRACT(EPOCH FROM (NOW() AT TIME ZONE 'UTC')) -
   EXTRACT(EPOCH FROM (MIN(time) AT TIME ZONE 'UTC'))
) AS sync_percent
FROM block;
                                    * Using ssh remotely:
If you want to query remotely, run this command via SSH:
ssh user@x.x.x.x -C "psql -d cexplorer -h localhost -p 5432 -U postgres -c \"SELECT 100 * (EXTRACT(EPOCH FROM (MAX(time) AT TIME ZONE 'UTC')) - EXTRACT(EPOCH FROM (MIN(time) AT TIME ZONE 'UTC'))) / (EXTRACT(EPOCH FROM (NOW() AT TIME ZONE 'UTC')) - EXTRACT(EPOCH FROM (MIN(time) AT TIME ZONE 'UTC'))) AS sync_percent FROM block;\""
                                       * Replace user@x.x.x.x with your SSH username and server IP address.
Step 3. Register SPO as a candidate in the block producer committee
Requirements​
                                       1. Operate a Cardano SPO (Step 1) and have the following Cardano keys handy:
                                       * The SPO cold.skey.
                                       * A valid UTXO with associated payment.vkey and payment.skey.
note
Extended BIP32-Ed25519 keys are not supported at this time.
                                       2. Run partnerchain dependencies with accessible Ogmios, Kupo, and Postgres-db-sync ports (Step 2). These ports will be needed.
                                       * Ensure Cardano-node node.socket and cardano-cli are accessible on the host machine.
tip
Midnight core provides public https://ogmios.preview.midnight.network/ and https://kupo.preview.midnight.network/ endpoints to assist SPOs with registration.
3a. Install Partner-chains.​
info
Midnight Testnet currently uses Partner-chains version 1.2.0.
                                       1. Download partner-chains
Partner-chains-cli is an open-source CLI tool to help interface with the Midnight partner-chain scripts that reside on the Cardano chain.

mkdir partner-chains
cd partner-chains
curl -L -o partner-chains-cli https://github.com/input-output-hk/partner-chains/releases/download/v1.2.0/partner-chains-cli-v1.2.0-x86_64-linux && chmod +x partner-chains-cli
curl -L -o partner-chains-node https://github.com/input-output-hk/partner-chains/releases/download/v1.2.0/partner-chains-node-v1.2.0-x86_64-linux && chmod +x partner-chains-node


#!/bin/bash


# Define the JSON content
json_content=$(cat <<EOF
{
   "cardano": {
       "network": 2,
       "security_parameter": 432,
       "active_slots_coeff": 0.05,
       "first_epoch_number": 0,
       "first_slot_number": 0,
       "epoch_duration_millis": 86400000,
       "first_epoch_timestamp_millis": 1666656000000
   },
   "chain_parameters": {
       "chain_id": 47,
       "genesis_committee_utxo": "d8774f03b4d44eddca22554fbb24f06bde27f8b7c29c979d79058f76b1e3f604#0",
       "threshold_numerator": 2,
       "threshold_denominator": 3,
       "governance_authority": "93f21ad1bba9ffc51f5c323e28a716c7f2a42c5b51517080b90028a6"
   },
   "cardano_addresses": {
       "committee_candidates_address": "addr_test1wp9pehc6t5xem0ccsf7dhktw4hu749dfm83fxx6p8f4jzpqyh330x",
       "d_parameter_policy_id": "8ebd47ced444426c9608aaff5c33048aa6753225bdcdb812192cbaabccab29f2",
       "permissioned_candidates_policy_id": "fba3da6ef1d2b67c9239df00e075edd1320de921708cc235341edefeb5012f13"
   }
}
EOF
)


# Create the file and write the JSON content to it
echo "$json_content" > partner-chains-cli-chain-config.json


# Check if the file was created successfully
if [ -f partner-chains-cli-chain-config.json ]; then
   echo "File 'partner-chains-cli-chain-config.json' has been created successfully."
else
   echo "Failed to create the file."
fi
This script:
                                       * Creates a partner-chains directory.
                                       * Downloads and sets permissions for both parner-chains-cli and partner-chains-node.
                                       * Creates and writes the JSON configuration file partner-chains-cli-chain-config.json with Midnight testnet parameters.
                                       2. Using Partner-chains-cli:
                                       * Invoke ./partner-chains-cli within the partner-chains directory:

./partner-chains-cli --help
Example output
3b. Generate Partner-chain keys​
The generate-keys wizard streamlines the setup for new partner chains node users by creating essential keys:
                                       * ECDSA cross-chain key
                                       * ED25519 Grandpa key
                                       * SR25519 Aura key
It will prompt to overwrite if keys already exist and can generate a network key if required.
                                       1. Generate Partner-chain keys:
                                       * Invoke ./partner-chains-cli generate-keys and follow the prompts to generate-keys:
./partner-chains-cli generate-keys
This 🧙 wizard will generate the following keys and save them to your node's keystore:
→  an ECDSA Cross-chain key
→  an ED25519 Grandpa key
→  an SR25519 Aura key
It will also generate a network key for your node if needed.

> node base path ./data

⚙️ Generating Cross-chain (ecdsa) key
running external command: ./partner-chains-node key generate --scheme ecdsa --output-type json
💾 Inserting Cross-chain (ecdsa) key
running external command: ./partner-chains-node key insert --base-path ./data --scheme ecdsa --key-type crch --suri 'stool grace post demise peanut father town urban blast park drastic december'
💾 Cross-chain key stored at ./data/chains/partner_chains_template/keystore/637263680x022819ea59be6b9c88cb80855dc949f07eb572c8034780bb2e0829aa004c02f11c

⚙️ Generating Grandpa (ed25519) key
running external command: ./partner-chains-node key generate --scheme ed25519 --output-type json
💾 Inserting Grandpa (ed25519) key
running external command: ./partner-chains-node key insert --base-path ./data --scheme ed25519 --key-type gran --suri 'brick major burden pencil vibrant original eager safe luxury black nominee clock'
💾 Grandpa key stored at ./data/chains/partner_chains_template/keystore/6772616e0x6759f8654a090cf97dcd2fce4c447d01de6c2656180a066c5a1174f7f81437e7

⚙️ Generating Aura (sr25519) key
running external command: ./partner-chains-node key generate --scheme sr25519 --output-type json
💾 Inserting Aura (sr25519) key
running external command: ./partner-chains-node key insert --base-path ./data --scheme sr25519 --key-type aura --suri 'permit market squirrel glance say volume special admit art reject thank jungle'
💾 Aura key stored at ./data/chains/partner_chains_template/keystore/617572610xe076f823767754eed012ffbbe80de0133d78d4875bdf79d627bcd86d0e934162

🔑 The following public keys were generated and saved to the partner-chains-public-keys.json file:
{
 "sidechain_pub_key": "0x022819ea59be6b9c88cb80855dc949f07eb572c8034780bb2e0829aa004c02f11c",
 "aura_pub_key": "0xe076f823767754eed012ffbbe80de0133d78d4875bdf79d627bcd86d0e934162",
 "grandpa_pub_key": "0x6759f8654a090cf97dcd2fce4c447d01de6c2656180a066c5a1174f7f81437e7"
}
You may share them with your chain governance authority
if you wish to be included as a permissioned candidate.

⚙️ Generating network key
running external command: ./partner-chains-node key generate-node-key --base-path ./data
command output: Generating key in "./data/chains/partner_chains_template/network/secret_ed25519"
command output: 12D3KooWSMEFnGDRmcUxyuf2fB4qQhGeq7ZYrifDhSYgL9phywzE


                                       * Let's move the keys from the generic partner chains directory to a keystore our node can find on a docker volume.
cp -R ./data/chains/partner_chains_template/ ./data/chains/testnet
3c. Register as a candidate in validator committee​
important
As mentioned in requirements at the top of this page, the registration process will need
                                       * the absolute path to SPO cold.skey,
                                       * absolute path to payment.skey that has a valid UTXO that can be spent on transaction fee,
                                       * absolute path to Cardano-node's node.socket, and
                                       * accessible ports to Ogmios, Kupo, and Postgres-db-syc.
                                       1. Create registration UTXO:
tip
If using docker container for cardano-node, then you may need to copy secrets to the container.

docker cp /home/priv/payment.vkey cardano-node:/home/payment.vkey
docker exec cardano-node rm -f /home/priv/payment.vkey
If using the provide docker-compose setup for partner-chain-dependencies, then the node.socket IPC path is available at /home/YOU_USER_NAME/ipc/node.socket.
                                       * Invoke ./partner-chains-cli register1 and follow the prompts:

./partner-chains-cli register1               
⚙️ Registering as a committee candidate (step 1/3)
> cardano cli executable docker exec cardano-node cardano-cli
> path to the cardano node socket file /home/stev/ipc/node.socket
⚙️ Set `CARDANO_NODE_SOCKET_PATH` environment variable to `/home/stev/ipc/node.socket`
> path to the payment verification file /home/payment.vkey
⚙️ Deriving address...
running external command: docker exec cardano-node cardano-cli address build --payment-verification-key-file /home/payment.vkey --testnet-magic 2
⚙️ Address: addr_test1vztfq6l59c97fqpu9qkzwj7fj478544klcqy64m85tnn5dqmcg7f4
⚙️ Querying UTXOs...
running external command: docker exec cardano-node cardano-cli query utxo --out-file /dev/stdout --address addr_test1vztfq6l59c97fqpu9qkzwj7fj478544klcqy64m85tnn5dqmcg7f4 --testnet-magic 2
> Select UTXO to use for registration 330577490dc7b1ec893a0fdaad3ca144b47c06208d6935ae6b17eb9f
bc955717#0 (10000000000 lovelace)
Please do not spend this UTXO, it needs to be consumed by the registration transaction.


Run the following command to generate signatures on the next step. It has to be executed on the machine with your SPO cold signing key.


./partner-chains-cli register2 \
--chain-id 47 \
--threshold-numerator 2 \
--threshold-denominator 3 \
--governance-authority 0x93f21ad1bba9ffc51f5c323e28a716c7f2a42c5b51517080b90028a6 \
--genesis-committee-utxo f44d20261bd3e079cc76b4d9b32b3330fea793b465c490766df71be90e577d8a#0 \
--registration-utxo 330577490dc7b1ec893a0fdaad3c...#0 \
--aura-pub-key 0xe076f823767754eed012ffbbe80de013... \
--grandpa-pub-key 0x6759f8654a090cf97dcd2fce4c447d... \
--sidechain-pub-key 0x022819ea59be6b9c88cb80855... \
--sidechain-signature 9fc29579fc1fa68e91216a1ae9a7d5777095fd...
The register1 command will return the next command when invoking register2. You simply need to copy and paste this.
                                       2. Generate registration signature:
note
SPO's cold.skey will be needed for register2 and ideally performed on an offline machine for mainnet.
                                       * Copy and paste the register2 command generated from the previous step:

./partner-chains-cli register2 \
--chain-id 47 \
--threshold-numerator 2 \
--threshold-denominator 3 \
--governance-authority 0x93f21ad1bba9ffc51f5c323e28a716c7f2a42c5b51517080b90028a6 \
--genesis-committee-utxo f44d20261bd3e079cc76b4d9b32b3330fea793b465c490766df71be90e577d8a#0 \
--registration-utxo 330577490dc7b1ec893a0fdaad3ca144...#0 \
--aura-pub-key 0xe076f823767754eed012ffbbe80de0133d78d4875bdf79d627bcd86d0e934162 \
--grandpa-pub-key 0x6759f8654a090cf97dcd2fce4c... \
--sidechain-pub-key 0x022819ea59be6b9c88cb80855dc949f07eb572... \
--sidechain-signature 9fc29579fc1fa68e91216a1ae9a7d5777095fd...


⚙️ Register as a committee candidate (step 2/3)
 This command will use SPO cold signing key for signing the registration message.
> Path to mainchain signing key file /home/stev/priv/cold.skey
To finish the registration process, run the following command on the machine with the partner chain dependencies running:


./partner-chains-cli register3 \
--chain-id 47 \
--threshold-numerator 2 \
--threshold-denominator 3 \
--governance-authority 0x93f21ad1bba9ffc51f5c323e28a716c7f2a42c5b51517080b90028a6 \
--genesis-committee-utxo f44d20261bd3e079cc76b4d9b32b3330fea793b465c490766df71be90e577d8a#0 \
--registration-utxo 330577490dc7b1ec893a0fdaad3ca144b4...#0 \
--aura-pub-key 0xe076f823767754eed012ffbbe80de0133d78... \
--grandpa-pub-key 0x6759f8654a090cf97dcd2fce4c...\
--sidechain-pub-key 0x022819ea59be6b9c88cb80855dc... \
--sidechain-signature 9fc29579fc1fa68e91216a1ae9a7d5777095fd... \
--spo-public-key 194d3d0b02bed63af74304d350d7... \
--spo-signature 9ed3f5e3c9c2474f7828472d67f571234eba6c82...
As you can see in the output, it provides the register3 command that you may simply copy and paste.
                                       2. Submit registration:
note
Kupo, Ogmios, and Postgres-db-sync ports will be needed for register3.
                                       * Simply copy and paste the register3 command and follow the prompts to submit registration:

./partner-chains-cli register3 \
 --chain-id 47 \
 --threshold-numerator 2 \
 --threshold-denominator 3 \
 --governance-authority 0x93f21ad1bba9ffc51f5c323e28a716c7f2a42c5b51517080b90028a6 \
 --genesis-committee-utxo f44d20261bd3e079cc76b4d9b32b3330fea793b465c49076...#0 \
 --registration-utxo 330577490dc7b1ec893a0fdaad3ca144b47c...#0 \
 --aura-pub-key 0xe076f823767754eed012ffbbe80de0133d78d487.... \
 --grandpa-pub-key 0x6759f8654a090cf97dcd2fce4c447d01... \
 --sidechain-pub-key 0x022819ea59be6b9c88cb80855dc949f07e... \
 --sidechain-signature 9fc29579fc1fa68e91216a1ae9a7d5777095fd4c559a9e7db662dca5bbd026ec56d3... \
 --spo-public-key 194d3d0b02bed63af74304d350d770e02413cd36e98f... \
 --spo-signature 9ed3f5e3c9c2474f7828472d67f571234eba6c82e908e5...
3d. Verifying registration​
The registration is valid in n + 2 mainchain epochs. Get the current epoch after registering:

curl -L -X POST -H "Content-Type: application/json" -d '{
     "jsonrpc": "2.0",
     "method": "sidechain_getStatus",
     "params": [],
     "id": 1
   }' https://rpc.testnet-02.midnight.network | jq
Example output:

curl -L -X POST -H "Content-Type: application/json" -d '{
     "jsonrpc": "2.0",
     "method": "sidechain_getStatus",
     "params": [],
     "id": 1
   }' https://rpc.testnet-02.midnight.network | jq
 % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                Dload  Upload   Total   Spent    Left  Speed
100   297  100   193  100   104    395    213 --:--:-- --:--:-- --:--:--   608
{
 "jsonrpc": "2.0",
 "result": {
   "sidechain": {
     "epoch": 239830,
     "slot": 287797102,
     "nextEpochTimestamp": 1726783200000
   },
   "mainchain": {
     "epoch": 695,
     "slot": 60126536,
     "nextEpochTimestamp": 1726790400000
   }
 },
 "id": 1
}
                                       * Query validator committee for n + 2 epochs.

curl -L -X POST -H "Content-Type: application/json" -d '{
     "jsonrpc": "2.0",
     "method": "sidechain_getAriadneParameters",
     "params": [697],
     "id": 1
   }' https://rpc.testnet-02.midnight.network | jq
Look for your registration under "candidateRegistrations": {). Ensure you see your Partner-chain keys in the registration and "isValid": true
🥳 At this point you are now registered as a candidate in the validator committee! Now, it's time to run a midnight-node in validator mode to produce Midnight blocks.
Deregister​
Deregistration can be performed using the ./sidechain-main-cli binary that's packaged with the partner-chain-cli. Deregister function will soon be included as part of partner-chain-cli in a near update. For the time being please use ./sidechain-main-cli.
                                       1. Submit deregistration:
                                       * Invoke ./sidechain-main-cli deregistration
                                       2. 
                                       3. ./sidechain-main-cli deregister \
                                       4. --payment-signing-key-file payment.skey \
--sidechain-id 47 \
--sidechain-genesis-hash 0x2b191cf0c368b79b4c7b4665f3d0b096b2d8c9a152f6f4904a76a1aa94a49831 \
--genesis-committee-hash-utxo f44d20261bd3e079cc76b4d9b32b3330fea793b465c490766df71be90e577d8a#0 \
--governance-authority 0x93f21ad1bba9ffc51f5c323e28a716c7f2a42c5b51517080b90028a6 \
--atms-kind plain-ecdsa-secp256k1 \
--threshold-numerator 2 \        
--threshold-denominator 3 \
--ada-based-staking \
--spo-public-key 53b0d8c9f… \
--ogmios-host localhost \
--ogmios-port 1337 \
--kupo-host localhost \
--kupo-port 1442

important
The payment-signing-key-file has to be the same one used for the registration.
Step 4. Run a Midnight node in Validator Mode
Requirements​
                                          1. DB_SYNC_POSTGRES should have accessible port for the intended Midnight Node instance and synced (Step 2).
                                          2. Midnight node is available as a Docker image at this time. Therefore, Docker/ Docker Compose is required.
                                          * Installing Docker/ Docker Compose.
4a. docker-compose up Midnight node in validator mode​
                                          1. Clone midnight-node-docker Repo:
A docker-compose repo is provided to easily start the midnight-node on testnet
                                             * Clone the repo
git clone git@github.com:midnight-ntwrk/midnight-node-docker.git # clone the repo
cd midnight-node-docker # enter the project
ls . # list contents

                                             2. This project contains a .env file containing important environment variables to modify.
                                             3. Update Environment Variables:
                                             * Open the .env file in a shell editor or VSCode.
                                             * Update DB_SYNC_POSTGRES_CONNECTION_STRING with the correct IP/ host and password to your instance.
git clone git@github.com:midnight-ntwrk/midnight-node-docker.git # clone the repo
cd midnight-node-docker # enter the project
ls . # list contents

                                             4. docker-compose up midnight-node:
                                             * Within the same directory as compose.yml, simply invoke docker-compose up to start the node.
docker-compose up
                                             5. The node should begin to peer with the testnet and validate blocks. Here is an example of a correct logs:
midnight-node-testnet-1  | 2024-09-24 19:19:03 💻 Target environment: gnu   
midnight-node-testnet-1  | 2024-09-24 19:19:03 💻 Memory: 7837MB   
midnight-node-testnet-1  | 2024-09-24 19:19:03 💻 Kernel: 6.10.4-linuxkit   
midnight-node-testnet-1  | 2024-09-24 19:19:03 💻 Linux distribution: Debian GNU/Linux trixie/sid   
midnight-node-testnet-1  | 2024-09-24 19:19:03 💻 Virtual machine: no   
midnight-node-testnet-1  | 2024-09-24 19:19:03 📦 Highest known block at #8936   
midnight-node-testnet-1  | 2024-09-24 19:19:03 〽️ Prometheus exporter started at 127.0.0.1:9615   
midnight-node-testnet-1  | 2024-09-24 19:19:03 Running JSON-RPC server: addr=127.0.0.1:9944, allowed origins=["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"]   
midnight-node-testnet-1  | 2024-09-24 19:19:08 ⚙️  Syncing, target=#79809 (6 peers), best: #8960 (0xb3c1…a312), finalized #8704 (0x0012…390d), ⬇ 710.7kiB/s ⬆ 6.7kiB/s   
midnight-node-testnet-1  | 2024-09-24 19:19:11 ✅ Validated Midnight transaction 48ad3bdfa2be837a7abde0ad3fc7badb24f32cd8f97beec4e5d2a05b62d21adb   
midnight-node-testnet-1  | 2024-09-24 19:19:12 ✅ Validated Midnight transaction e0fe7c184a6512fe48bb2494cc60ea4583c7be1b10b8100b1be65966894c6191   
midnight-node-testnet-1  | 2024-09-24 19:19:12 ✅ Validated Midnight transaction 43f15469e7e4a12db60627c11554b912b84620d1c76f9ce765cdfee26b4c08df   
midnight-node-testnet-1  | 2024-09-24 19:19:13 ⚙️  Syncing 19.9 bps, target=#79810 (9 peers), best: #9060 (0x3c59…c88f), finalized #8704 (0x0012…390d), ⬇ 81.5kiB/s ⬆ 0.9kiB/s   
midnight-node-testnet-1  | 2024-09-24 19:19:13 ✅ Validated Midnight transaction 82d11c6280c0ef43d50f6d38fc760425af5d39c84e1d2f2fd7a637c88c7783be   
midnight-node-testnet-1  | 2024-09-24 19:19:13 ✅ Validated Midnight transaction 20e4c4f60db1a549379bb4ac37720be95fa5e1e8e174aaf4112f93ddc72154b9   
midnight-node-testnet-1  | 2024-09-24 19:19:15 💼 Selected 540 validators for epoch 239829, from 12 permissioned candidates and 6 trustless candidates   
midnight-node-testnet-1  | 2024-09-24 19:19:15 ⏳ New epoch 239828 starting at block 9216   
midnight-node-testnet-1  | 2024-09-24 19:19:15 New session 8   
midnight-node-testnet-1  | 2024-09-24 19:19:15 Committee rotated: Returning 540 validators, stored in epoch 239828   
midnight-node-testnet-1  | 2024-09-24 19:19:15 Start session 8, epoch 239828   
midnight-node-testnet-1  | 2024-09-24 19:19:15 💼 Storing committee of size 540 for epoch 239829   
midnight-node-testnet-1  | 2024-09-24 19:19:16 ✅ Validated Midnight transaction ecc8eab39435383a5efb505cee746119f2e1ae19dbf36dba496a878124f17526   
midnight-node-testnet-1  | 2024-09-24 19:19:17 ✅ Validated Midnight transaction 67183e9a12d25d2b58856388918a892a52009ea7d6767df6c1f7af9a8eccd4a9   
midnight-node-testnet-1  | 2024-09-24 19:19:17 ✅ Validated Midnight transaction bcbdba7aa7546331b143d2e7d434a7b285ed18ef42a334529dd7d5ba5f969bde   
midnight-node-testnet-1  | 2024-09-24 19:19:17 ✅ Validated Midnight transaction

[a]Not required for Preview network. Consider removing.
[b]Relay nodes do not synchronise data between postgres and the chain, that's cardano-db-sync
[c]at this block, mine is already at 21GB..
[d]based on https://github.com/CardanoSolutions/kupo/releases Kupo 2.10.0 is integrated with Cardano Node 10.1.3
[e]based on https://github.com/CardanoSolutions/ogmios, Cardano Node 10.1.4 is supported on Ogmios 6.10.0+
[f]Only 1 is really required. And even if running a relay and a validator, it can be done on a single machine for testnet.


In fact: everything can run just fine on a single N150 16GB RAM 500GB SSD machine for testnet.