var readlineSync = require('readline-sync');
var prompt = require('prompt-sync')();
var exit = false;
var menu = [
    'Print current folder',
    'Change current folder',
    'Create file or folder',
    'Delete file or folder',
    'Search in file or folder',
    'Quit Program'
];

/* this will be the storage for our file system */
var fsStorage = [
    [0, 0, 'root'],
    [1, 0, 'subfolder1'],
    [2, 0, 'subfolder2'],
    [3, 0, 'subfolder3'],
    [4, 1, 'subfolder4'],
    [5, 4, 'subfolder5'],
    [6, 5, 'file1', 'content'],
    [7, 5, 'file2', 'content']
];


var currentFolder = 0;

main();

function main() {
    while (!exit) {
        printMenu();
    }
    process.exit(0);
}

function printMenu() {
    var answer = readlineSync.keyInSelect(menu, 'Please make your choise:');
    switch (answer) {
        case 0: printCurrentFolder(); break;
        case 1: changeCurrentFolder(); break;
        case 2: createFileOrFolder(); break;
        case 3: deleteFileOrFolder(); break;
        case 4: searchInFileOrFolder(); break;
        case 5: quitProgram(); break;
    }
}

function printCurrentFolder() {
    console.log('printing current folder');
    /* todo: implement hierarcial folder and file printing at current folder  */
            var line;
    for( i = 0; i < fsStorage.length; ++i ){
        if(fsStorage[i][0] == currentFolder || fsStorage[i][1] == currentFolder){

            if(fsStorage[i][0] == currentFolder){
                console.log("-"+ fsStorage[i][2])
            }

            else{console.log(fsStorage[i][2]);}

        }
    }


}

function changeCurrentFolder() {
    console.log('changing current folder');
    /* todo: implement cli to move in all directions  */
        var upOrDown = prompt("go forward(..) or backward?(cd/.. )")
        var notFound = true;
        if(upOrDown == ".."){

        var answer = prompt('Change Directory to:');
        for(i = 0; i < fsStorage.length; ++i){
            if(fsStorage[i][1] == currentFolder && fsStorage[i][2] == answer && fsStorage[i].length < 4){
                console.log("Hello! you change current file to: "+ fsStorage[i][2]);
                notFound = false;
                currentFolder = fsStorage[i][0];
            }

              }

        if(notFound == true){
            console.log("No Such Directory!")
        }

           }

        if(upOrDown == "cd/.."){

            for(i = 0; i < fsStorage.length; ++i){
                if(fsStorage[currentFolder][1] == fsStorage[i][0]){
                    console.log("Hello! you change current file to: "+ fsStorage[i][2]);
                    notFound = false;
                    currentFolder = fsStorage[i][0];
                }
                     }
            if(notFound == true){
                console.log("No Such Directory!")
            }
                }





                      }

function createFileOrFolder() {
    console.log('creating file folder');
    /* todo: implement additon of file/folder to file system array   */
    var answer = prompt("create file or a folder?");
    var exists = false;

    if(answer == "folder"){

        var folderName = prompt("what is the folder name? ");
        for(i = 0; i < fsStorage.length; ++i){
            if(fsStorage[i][2] == folderName && fsStorage[i][1] == currentFolder){
                exists = true;
            }
        };

        if(exists == false){
        console.log("created folder: "+folderName);
        var newFolder = [fsStorage.length, currentFolder, folderName]
        fsStorage.push(newFolder);
        }

        if(exists == true){
            console.log("name already exists")
        }

    }

    else if (answer == "file"){
        var fileName = prompt ("what is the file name?");
        for(i = 0; i < fsStorage.length; ++i){
            if(fsStorage[i][2] == fileName && fsStorage[i][1] == currentFolder){
                exists = true;
            }
        };

    if(exists == false){
        var content = prompt("write your content:")
        console.log("created file: "+fileName)
        var newFile = [fsStorage.length, currentFolder, fileName, content ]
        fsStorage.push(newFile);
    }
    if(exists == true){
        console.log("name is already exists")
    }
    }

     }

    function deleteFileOrFolder() {
    console.log('delete file folder');
    /* todo: implement deletion of file/folder from file system array   */

    var answer = prompt("write folder / file name to delete: ");
    var folderToDelete;
    var children = [];
    var canBeDeleted = false;

        for (i = 0; i < fsStorage.length; ++i) {
            if (fsStorage[i][2] == answer && fsStorage[i][2] != "root" && fsStorage[i][1] == currentFolder) {
                canBeDeleted = true;
                folderToDelete = fsStorage[i][0];
                deleteChildren(folderToDelete);
                fsStorage.splice(i,1);


            }




        };

        fsStorage.some(function(item){
          if(children.indexOf(item[0]) != -1){
              fsStorage.splice(fsStorage.indexOf(item))
          };
        });


        if(canBeDeleted == false){
            console.log("cannot be deleted")
        } else{console.log("deleted: " +  answer)}

        function deleteChildren(id){
            fsStorage.forEach(function(item){
                if(item[1] == id){
                    children.push(item[0]);

                    deleteChildren(item[0])
                }
            })
        }

    };




function searchInFileOrFolder() {
    console.log('searching current files folder');
    /* todo: implement search across all folders by name and content  */
    var searchAnswer = prompt("Search for a File in the Current Directory ");
    var targetItem;
    var result = "path: root -->";
    var itemExists = false;
    var names = [];
    for(i = 0; i < fsStorage.length; ++i){
        if(fsStorage[i][2] == searchAnswer){
            itemExists = true;
        }
    }
    if(itemExists == true) {
        for (i = 0; i < fsStorage.length; ++i) {
            if (fsStorage[i][2] == searchAnswer) {
                targetItem = fsStorage[i];
                findAllDir(targetItem);
            }
        }

        for(i = names.length-1; i >= 0 ; --i){
            result += names[i] + "-->"
        }
        result +=searchAnswer


        console.log(result)







    }

    else{console.log("file/folder does not exists")}

    function findAllDir(targetItem){
        for(i = 0; i < fsStorage.length; ++i){
            if(fsStorage[i][0] == targetItem[1] && fsStorage[i][0] != 0){
                names.push(fsStorage[i][2]);
                findAllDir(fsStorage[i])

            }

        }
    }

}

function quitProgram() {
    var answer = readlineSync.keyInYNStrict('Are you sure?');
    exit = answer ? true : false;
}


