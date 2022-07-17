import { TextDecoder, TextEncoder } from "util";
import { InMemoryFile } from "../InMemoryFile";
import { InMemoryPackageReader } from "../InMemoryPackageReader";
import { IPackageReader } from "../IPackageReader";

describe("Reader", () => {
  it("can read a binary file", async () => {
    const bytes = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const file = new InMemoryFile("file.bin", bytes);

    const reader: IPackageReader = new InMemoryPackageReader([file]);
    const contents = await reader.readFile("file.bin");

    expect(contents).toEqual(bytes);
  });

  it("can read a text file", async () => {
    const fileText = "This is some text\nand more text";
    const file = new InMemoryFile("file.txt", new TextEncoder().encode(fileText));

    const reader: IPackageReader = new InMemoryPackageReader([file]);
    const contents = await reader.readFile("file.txt");

    expect(new TextDecoder().decode(contents)).toEqual(fileText);
  });

  it("can read stats of a file", async () => {
    const fileText = "This is some text\nand more text";
    const fileBytes = new TextEncoder().encode(fileText);
    const file = new InMemoryFile("file.txt", fileBytes);

    const reader: IPackageReader = new InMemoryPackageReader([file]);
    const stats = await reader.getStats("file.txt");

    expect(stats.isFile).toEqual(true);
    expect(stats.isDir).toEqual(false);
    expect(stats.size).toEqual(fileBytes.byteLength);
  });

  it("can read a directory", async () => {
    const file1Text = "This is some text1\nand more text";
    const file2Text = "This is some text2\nand more text";
    const file1Bytes = new TextEncoder().encode(file1Text);
    const file2Bytes = new TextEncoder().encode(file2Text);
    const file1 = new InMemoryFile("file1.txt", file1Bytes);
    const file2 = new InMemoryFile("file2.txt", file2Bytes);

    const reader: IPackageReader = new InMemoryPackageReader([file1, file2]);
    const items = await reader.readDir(".");

    expect(items).toEqual(["file1.txt", "file2.txt"]);
  });
});
