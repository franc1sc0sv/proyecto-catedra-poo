
import java.math.BigDecimal;
import java.util.*;

class User {

    private UUID id;
    private String name;
    private String email;
    private String password;
    private Role role;
    private Date createdAt;
    private Date updatedAt;

    public User(UUID id, String name, String email, String password, Role role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = new Date();
    }

    public void updateData(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.updatedAt = new Date();
    }
}

enum Role {
    ADMIN, CLIENT, EMPLOYEE;
}

interface Manageable {

    void updateData(String name, String phone, String email, String address);

    void deactivate();
}

abstract class Person implements Manageable {

    protected UUID id;
    protected String name;
    protected String document;
    protected String type;
    protected String phone;
    protected String email;
    protected String address;
    protected String status;
    protected User createdBy;
    protected Date createdAt;
    protected Date updatedAt;
    protected Date deactivatedAt;

    public Person(UUID id, String name, String document, String type, String phone, String email, String address, User createdBy) {
        this.id = id;
        this.name = name;
        this.document = document;
        this.type = type;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.status = "Active";
        this.createdBy = createdBy;
        this.createdAt = new Date();
    }

    @Override
    public void deactivate() {
        this.status = "Inactive";
        this.deactivatedAt = new Date();
    }
}

class Client extends Person {

    public Client(UUID id, String name, String document, String type, String phone, String email, String address, User createdBy) {
        super(id, name, document, type, phone, email, address, createdBy);
    }

    @Override
    public void updateData(String name, String phone, String email, String address) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.updatedAt = new Date();
    }
}

class Employee extends Person {

    private String hiringType;

    public Employee(UUID id, String name, String document, String type, String hiringType, String phone, String email, String address, User createdBy) {
        super(id, name, document, type, phone, email, address, createdBy);
        this.hiringType = hiringType;
    }

    @Override
    public void updateData(String name, String phone, String email, String address) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.updatedAt = new Date();
    }
}

class Quotation {

    private UUID id;
    private Client client;
    private String status;
    private Date tentativeStartDate;
    private Date tentativeEndDate;
    private BigDecimal totalCost;
    private List<Assignment> assignments;

    public Quotation(UUID id, Client client, Date tentativeStartDate, Date tentativeEndDate) {
        this.id = id;
        this.client = client;
        this.status = "In Progress";
        this.tentativeStartDate = tentativeStartDate;
        this.tentativeEndDate = tentativeEndDate;
        this.totalCost = BigDecimal.ZERO;
        this.assignments = new ArrayList<>();
    }

    public void addAssignment(Assignment assignment) {
        this.assignments.add(assignment);
        recalculateCost();
    }

    public void finalizeQuotation() {
        if (!assignments.isEmpty()) {
            this.status = "Finalized";
        }
    }

    private void recalculateCost() {
        this.totalCost = assignments.stream()
                .map(Assignment::getTotalCost)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}

class Assignment {

    private UUID id;
    private Quotation quotation;
    private Employee worker;
    private String area;
    private BigDecimal hourlyRate;
    private Date startDate;
    private Date endDate;
    private int estimatedHours;
    private BigDecimal baseCost;
    private BigDecimal extraIncrement;

    public Assignment(UUID id, Quotation quotation, Employee worker, String area, BigDecimal hourlyRate, Date startDate, Date endDate, int estimatedHours, BigDecimal extraIncrement) {
        this.id = id;
        this.quotation = quotation;
        this.worker = worker;
        this.area = area;
        this.hourlyRate = hourlyRate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.estimatedHours = estimatedHours;
        this.extraIncrement = extraIncrement;
        this.baseCost = hourlyRate.multiply(BigDecimal.valueOf(estimatedHours));
    }

    public BigDecimal getTotalCost() {
        return baseCost.add(baseCost.multiply(extraIncrement.divide(BigDecimal.valueOf(100))));
    }
}

public class Main {

    public static void main(String[] args) {
        User admin = new User(UUID.randomUUID(), "Admin", "admin@email.com", "password123", Role.ADMIN);
        Client client = new Client(UUID.randomUUID(), "Company X", "123456", "Legal", "123456789", "company@email.com", "Fake Street 123", admin);
        Employee employee = new Employee(UUID.randomUUID(), "John Doe", "654321", "Natural", "Permanent", "987654321", "john@email.com", "Evergreen Avenue", admin);

        Quotation quotation = new Quotation(UUID.randomUUID(), client, new Date(), new Date());
        Assignment assignment = new Assignment(UUID.randomUUID(), quotation, employee, "Networks", new BigDecimal(10), new Date(), new Date(), 40, new BigDecimal(10));
        quotation.addAssignment(assignment);

        System.out.println("Quotation finalized: " + quotation.finalizeQuotation());
    }
}
