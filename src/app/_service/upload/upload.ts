export class Upload {

    $key: string;
    file: File;
    name: string;
    url: string;
    progress: number;
    createdAt: Date = new Date();
    path: string;

    constructor(file: File, path: string) {
        this.file = file;
        this.path = path;
    }
}