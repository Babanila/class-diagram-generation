## USE CASES

### Use Case 1

The cashier stored the customer details like customer_name, customer_age, and customer_address. The player saved the club details which includes the club name, club age, and club address.

### Use Case 2

The Library system is used by the Informatics Students and Faculty. The Library contains Books and Journals. Books can be issued to both the Students and Faculty. Journals can only be issued to the Faculty. Books and Journals can only be issued by the Librarian. The deputy-Librarian is in-charge of receiving the Returned Books and Journals. The Accountant is responsible for receiving the fine for over-due Books. Fine is charged only to Students, and not to the Faculty.

### Use Case 3: 

A library issues loan items to customers. Each customer is known as a member and is issued a membership card that shows a unique member number. Along with the membership number other details on a customer must be kept such as a name, address, and date of birth. The library is made up of a number of subject sections. Each section is denoted by a classification mark A loan item is uniquely identified by a barcode. There are two types of loan items, language tapes and books. A language tape has a title language (e.g. French), and level (e g.beginner). A book has a title, and author(s). A customer may borrow up to a maximum of 8 items at one time. An item can be borrowed, reserved or renewed to extend a current loan. When an item is issued the customer's membership number is scanned via a barcode reader or entered manually. If the membership is still valid and the number of loan items less than 8, the book barcode is read, either via the barcode reader or entered manually. If the item can be issued (e.g. not reserved) the item is stamped and then issued. The library must support the facility for an item to be searched and for a daily update of records.


### Use Case 4: Process Rents
As a primary use case, the purpose of Process Rents is to capture rental items along with payment. A store employee (staff) checks out items for a customer by calculating due dates and correct charges. The use case also checks any overdue items. The store employee accepts payments for the items and any late payments. A rental slip is issued and stored by the store employee. As preconditions, the staff is logged on and the barcodes of items are known. A 18 customer arrives at the point of sell terminal (POST) with tapes to rent. If the person is a new customer, the staff creates an account for the customer. If the person is an existing customer, the staff verifies customer status by scanning the ID card. System finds customer information and displays it. System also checks overdue items and displays associated information like item information, due date, and fine. The staff records new rental items by scanning the barcodes. This is repeated for all the items to be checked out. Rental object and rental line item objects are created. System determines the rental price and due date and displays title, due date, and price in the transaction. On completion of item entry, the staff indicates to the POST that the item entry is complete. System records the date, calculates tax, and displays the total rental fee. Any overdue fee is added up to customer’s outstanding balance. Customer pays the amount due either by cash, check, debit card, or credit card. When paid by debit card or credit card, system contacts card authorization system, which validates the card and process the payment. If pay fee is successfully done, inventory is reduced for the rental items. Receipt is printed. All transaction data is saved onto the database. The staff gives items and receipt to customer and stores the rental order list. In other successful scenarios, if scanning ID card fails, the staff enters ID number manually. If the ID number fails, the staff searches the system using customer’s last name and phone number. In unsuccessful scenarios, if customer challenges the overdue fee, the staff may waive the overdue fee, reduce it by 50% or call management.

### Use Case 5: Maintain Customer

In use case maintain customer, a store employee creates an account for a new customer by inputting customer information, i.e. last name, first name, address, zip code, phone number, rental items, outstanding balance, etc. When customer asks for personal information update, the staff logs on the system and changes the corresponding information. When processing rents, the rental records of the customer get updated.

### Use Case 6: Process Returns

In use case process returns, customer brings the rental tapes to the counter. The staff scans the rental items one by one. The system takes in the scanned barcode and finds the corresponding customer and associated rental records. If scanning the barcode fails, the staff enters the code manually. If the code fails, the title of the item is entered to search through the system. The system checks overdue. If the item is overdue, the overdue fee is calculated and applied to the outstanding balance. The system proceeds to process payment. A receipt is printed for the customer. The system updates the inventory by increasing the returned item and updates the rental records by resetting the rental items and payment.

### Use case 7: Maintain Inventory

Inventory has four types of media, which are CD, DVD, Video, or Game. The items with the same title could have different media types. And each title of a certain media type usually has multiple copies of items. Each item has one unique ID for the system to keep track of it.
When new purchased items arrive, the staff creates new entry for items with new titles by inputting the title name, number of copies, available number, purchase cost, date obtained, etc.
If the title already exists in the system, the number of copies and available number of that title get updated by incrementing the number of items.
After a rental is processed, the number of available items under the title is reduced by one. After a return is processed, the number of available items under the title is increased by one.
