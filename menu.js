const index = require('./index');
const telegram = require('./telegram');
const SysTray = require('systray2').default;

var exec = require('child_process').exec;


function call_cmd(input) {
    const child = exec('notepad ' + input);
    child.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });
}


const item1 = {
    title: 'Mesrobot',
    tooltip: 'Mesrobot',
    checked: false,
    enabled: false,
    // click is not a standard property but a custom value
    // click: () => {
    //     item1.checked = !item1.checked
    //     systray.sendAction({
    //         type: 'update-item',
    //         item: item1,
    //     });
    //     // toggle Exit
    //     itemExit.hidden = !itemExit.hidden
    //     systray.sendAction({
    //         type: 'update-item',
    //         item: itemExit,
    //     })
    // }
};

const item2 = {
    title: 'Tags',
    tooltip: 'bb',
    checked: false,
    enabled: true,
    hidden: false,
    items: [{
        title: 'Refresh tags',
        tooltip: 'this is a submenu item',
        checked: false,
        enabled: true,
        click: () => {
            index.refreshTag()
        }
    },
        {
            title: 'Config tags',
            tooltip: 'this is a submenu item',
            checked: false,
            enabled: true,
            click: () => {
                call_cmd('tags.json')
            }
        }]
};

const item3 = {
    title: 'Users',
    tooltip: 'bb',
    checked: false,
    enabled: true,
    hidden: false,
    // add a submenu item
    items: [{
        title: 'Refresh users',
        tooltip: 'this is a submenu item',
        checked: false,
        enabled: true,
        click: () => {
            telegram.refreshUsers()
        }
    },
        {
            title: 'Config users',
            tooltip: 'this is a submenu item',
            checked: false,
            enabled: true,
            click: () => {
                call_cmd('users.json')
            }
        }]
};

const itemExit = {
    title: 'Exit',
    tooltip: 'bb',
    checked: false,
    enabled: true,
    click: () => {
        systray.kill(false)
    }
};
const systray = new SysTray({
    menu: {
        // you should use .png icon on macOS/Linux, and .ico format on Windows
        icon: './logo.ico',
        title: 'Mesrobot',
        tooltip: 'Mesrobot',
        items: [
            item1,
            SysTray.separator, // SysTray.separator is equivalent to a MenuItem with "title" equals "<SEPARATOR>"
            item2,
            item3,
            itemExit
        ]
    },
    debug: false,
    copyDir: false // copy go tray binary to outside directory, useful for packing tool like pkg.
});

systray.onClick(action => {
    if (action.item.click != null) {
        action.item.click()
    }
});

// Systray.ready is a promise which resolves when the tray is ready.
systray.ready().then(() => {
    console.log('systray started!')
});
