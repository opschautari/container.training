
This is simple guideline to create new slides, I am documenting them so you could quick start creating your version.

## Steps
1. Create a file like k8s101.yml inside slides directory
2. Thats your yaml file where you define:
  - meta information of your slide like: title, gitrepo, slidenubmerprefix,....
  - you have options to exclude tags(class)
  - and there you define you slides in markdown

3. Markdown file inside content would be the real slide materials.
   - Each markdown contains multiple blocks
   - `---` is used to separate slide contents
   - you can define class like: `class: extra-details` and later filter out with `exclude:` on yaml file

4. And to generate the html file, you just need to run `./build.sh once` or `./build.sh forever` 
