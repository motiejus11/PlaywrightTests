import { test, expect } from '@playwright/test';

test.describe('Todojames Tests', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://todolist.james.am/#/')
    });

    test('has title h1', async ({ page }) => {
        await expect(page).toHaveTitle("To Do List");
        await expect(page.locator('h1')).toHaveText('To Do List');
        await expect(page.getByRole('heading', {name: 'To Do List'})).toBeVisible();
        //pagal turima teksta

        await expect(page.getByText('To Do List')).toBeVisible();
      });
    
    test('add new item', async ({ page }) => {
     

        await page.locator('input.new-todo').fill('1 uzduotis');
        await page.keyboard.press('Enter');
        await page.locator('input.new-todo').fill('1 uzduotis');
        await page.keyboard.press('Enter');
        await page.locator('input.new-todo').fill('1 uzduotis');
        await page.keyboard.press('Enter');
        
        await expect(page.getByText('1 uzduotis').nth(1)).toBeVisible();

     
    });

    test('Create new to do', async ({ page }) => {
        await page.fill('input.new-todo', '1 uzduotis');
        await page.press('input.new-todo', 'Enter');
        const todoItem = page.locator('ul.todo-list li', { hasText: '1 uzduotis' });
        await expect(todoItem).toBeVisible();
    });
    

    test('delete item', async ({ page }) => {
        await page.fill('input.new-todo', '1 uzduotis');
        await page.press('input.new-todo', 'Enter');
        const todoItem = page.locator('ul.todo-list li', {hasText: '1 uzduotis'});
        await todoItem.hover();
        await todoItem.locator('button.destroy').click();
       
        await expect(todoItem).toHaveCount(0);
      });
    
    test('update item', async ({ page }) => {
        await page.fill('input.new-todo', '1 uzduotis');
        await page.press('input.new-todo', 'Enter');
        
        const todoItem = page.locator('ul.todo-list li', { hasText: '1 uzduotis' });
        await todoItem.dblclick();

        const editInput = page.locator('input.edit');
        await editInput.fill('paredagavom');
        await editInput.press('Enter');

        const editedItem = page.locator('ul.todo-list li', { hasText: 'paredagavom' });
        await expect(editedItem).toBeVisible();

    
    });
    
    test('count items', async ({ page }) => {
        await page.fill('input.new-todo', '1 uzduotis');
        await page.press('input.new-todo', 'Enter');
        await page.fill('input.new-todo', '1 uzduotis');
        await page.press('input.new-todo', 'Enter');
        await page.fill('input.new-todo', '1 uzduotis');
        await page.press('input.new-todo', 'Enter');
        await page.fill('input.new-todo', '1 uzduotis');
        await page.press('input.new-todo', 'Enter');
        await page.fill('input.new-todo', '1 uzduotis');
        await page.press('input.new-todo', 'Enter');
        await page.fill('input.new-todo', '1 uzduotis');
        await page.press('input.new-todo', 'Enter');

        const fullList = page.locator('ul.todo-list li');

        await expect(fullList).toHaveCount(6);
    });


});
