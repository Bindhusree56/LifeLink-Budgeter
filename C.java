import java.lang.*; 
class A 
{ 
String college="ABC"; 
String name; 
double salary; 
A(String s,double d) 
{ 
name=s; 
salary=d; 
} 
void data() 
{ 
name="jaya"; 
salary=25000.45; 
System.out.println("data is:"+name+" 
"+salary); 
} 
void display() 
{ 
System.out.println("data is:"+name+" 
"+salary); 
} 
} 
class B extends A 
{ 
int yoe; 
String college="XYZ"; 
B(String s, double d,int y) 
{ 
super(s,d); 
this.yoe=y; 
System.out.println("B class"); 
} 
void display() 
{ 
super.display(); 
System.out.println("data is:"+name+" 
"+salary+" "+yoe); 
System.out.println("college in name in 
child class"+college); 
System.out.println("college in name in 
parent class"+super.college); 
} 
} 
class C 
{ 
public static void main(String[] args) 
{ 
B obj=new B("Bindhu",25000.45,13); 
obj.display(); 
} 
}