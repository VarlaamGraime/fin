import React, { useState, useEffect } from 'react';
import pict from '../src/pict.png'

function App() {
  const [нормаЧасов, установитьНормуЧасов] = useState(167);
  const [оклад, установитьОклад] = useState(100000);
  const [массив1, установитьМассив1] = useState([ ]);
  const [массив2, установитьМассив2] = useState([ ]);
  const [массив3, установитьМассив3] = useState([ ]);
  const [массив4, установитьМассив4] = useState([ ]);
  const [результаты, установитьРезультаты] = useState( );

  const рассчитатьИтоговуюЗП = () => {
    const новыеРезультаты = рассчитатьЗарплату(массив1, массив2, нормаЧасов, оклад);
    установитьРезультаты(новыеРезультаты);
  };
  const ценаЧаса = оклад / нормаЧасов;
  const ценаЧасаПереработки = ценаЧаса * 1.5; 
  const ценаЧасаПереработкиБонус =  ценаЧасаПереработки - ценаЧаса; 


  useEffect(() => {
    const новыеРезультаты = рассчитатьЗарплату(массив1, массив2, нормаЧасов, оклад);
    установитьРезультаты(новыеРезультаты);
  }, [массив1, массив2, нормаЧасов, оклад]);
  const handleInputChange = (event, setState) => {
    const { value } = event.target;
    const новыйМассив = value.split(',').map(Number);
    setState(Array.isArray(новыйМассив) ? новыйМассив : parseInt(value, 10));
  };

  const lineStyle = {
    border: '1px solid black',
    height: '0',
  };


  function переработки(условие) {
    if (нормаЧасов <= результаты.итого) {
      return <p>Итоговая зп { parseInt
        (Math.round(
          (результаты.количествоПереработок*ценаЧаса*0.5)+
          (((массив1).reduce((acc, curr) => acc + curr, 0))*ценаЧаса)+ // День часы 
          (((массив2).reduce((acc, curr) => acc + curr, 0))*ценаЧаса)+ // Ночь часы 
          (((массив2).reduce((acc, curr) => acc + curr, 0))*ценаЧаса*0.2  )+ // Ночь 
          (((массив4).reduce((acc, curr) => acc + curr, 0)) *(ценаЧаса/2)) // двойной коэф
          ))} 
          руб</p>;
    }
    return <div> окладная {результаты.итого*результаты.ценаЧаса + 
      (((массив2).reduce((acc, curr) => acc + curr, 0)*1.2) - ((массив2).reduce((acc, curr) => acc + curr, 0)) )+
      (((массив3).reduce((acc, curr) => acc + curr, 0)) * ценаЧасаПереработкиБонус)+
      (((массив4).reduce((acc, curr) => acc + curr, 0)) * ценаЧаса)
      } 
      
      
       </div>;
  }

console.log(массив3,массив4)

  return (
    <div className="App list">
      <label>
        Норма часов:
        <input type="number" value={нормаЧасов} onChange={(e) => handleInputChange(e, установитьНормуЧасов)} />
      </label><br/><br/>

      <label>
        Оклад:
        <input type="number" value={оклад} onChange={(e) => handleInputChange(e, установитьОклад)} />
      </label><br/><br/>

      <label>
        Дневные часы через запятую, либо сумму:
        <input type="text" value={массив1.join(',')} onChange={(e) => handleInputChange(e, установитьМассив1)} />
      </label><br/><br/>

      <label>
        Ночные часы через запятую, либо сумму:
        <input type="text" value={массив2.join(',')} onChange={(e) => handleInputChange(e, установитьМассив2)} />
      </label><br/><br/>

      <label>
        Новогодние бонусы х2
        <input type="text" value={массив4.join(',')} onChange={(e) => handleInputChange(e, установитьМассив4)} />
      </label><br/><br/>  

      <button onClick={рассчитатьИтоговуюЗП}>Рассчитать</button>

      {/* Вывод результатов */}
      {результаты && (
        <div>
          <p>Норма часов: {нормаЧасов}</p>
          <p>Дневных (часов): {результаты.суммаПервогоМассива}</p>
          <p>Ночных (часов): {результаты.суммаИзВторогоМассива}</p> 
          <p>Итого часов: { (результаты.итого   )}</p>
          <p>Цена часа: {Math.round(результаты.ценаЧаса)}руб</p>
          <p>Цена часа переработки: {Math.round(результаты.ценаЧасаПереработки)}руб</p>
          <p>Итоговый ночной бонус: {Math.round ((результаты.суммаИзВторогоМассива*результаты.ценаЧаса*1.2)-(результаты.суммаИзВторогоМассива*результаты.ценаЧаса))}руб</p>
          <p>бонус коэфициента х2: {Math.round(((массив4).reduce((acc, curr) => acc + curr, 0)) * (ценаЧаса/2))}руб</p>

          {/* <p>Сумма за переработки  { Math.round(
            ((результаты.суммаИзВторогоМассива*результаты.ценаЧаса*1.2)-(результаты.суммаИзВторогоМассива*результаты.ценаЧаса))+
            (результаты.суммаИзВторогоМассива*результаты.ценаЧаса*1.5)-(результаты.суммаИзВторогоМассива*результаты.ценаЧаса)+
            (результаты.суммаИзВторогоМассива*результаты.ценаЧаса*2)-(результаты.суммаИзВторогоМассива*результаты.ценаЧаса)+
            (((массив3).reduce((acc, curr) => acc + curr, 0)) * ценаЧасаПереработкиБонус)+
            (((массив4).reduce((acc, curr) => acc + curr, 0)) * ценаЧаса)
            )} руб 
          </p>  */}
          <переработки/>
  
          
          {/* <h2>Инструкция</h2>
          <h3>На данный момент программа считает зп только, если у вас есть переработки, т.е. выполненна норма часов </h3>
          <h4>В поле ввода дневных часов необходимо по очереди ввести через запятую ваши часы,
            в следующее окно необходимо ввести ночные часы. <br/>
            Первое число Первого  списка - количество часов, отработанных днем первого рабочего дня месяца, и тд;  <br/>
            Первое число Второго списка - количество часов,  отработанных ночью первого рабочего дня месяца и тд; <br/>
            Если вы не работали в определенные дни ночью, но работали днем, необходимо поставить 0 в соответствующем списке, то же самое касается дня </h4>
            <img src={pict}/><br/>
            Данный пример означает, что вы отработали:<br/>
            в первый рабочий день: 10 дневных и 0 ночных;<br/>
            во второй рабочий день: 0 дненвых и 10 ночных;<br/>
            в третий рабочий день: 10 дневных и 10 ночных.<br/>
            <div style={lineStyle}></div><br/>
            Значение параметров:<br/>
            Дневных в составе нормы (часов) - сколько у вас было дневных часов, до выполнения нормы;<br/>
            Ночных в составе нормы (часов) - сколько у вас было ночных часов, до выполнения нормы;<br/>
            Переработки день - сколько у вас было дневных часов, после выполнения нормы;<br/>
            Переработки ночь - сколько у вас было ночных часов, после  выполнения нормы;<br/>
            Итого часов - всего ваших часов;<br/>
            сумма за ночные в составе нормы (рублей) - ваш бонус за ночные смены, за часы, до набора нормы;<br/>
            Переработки день - то, сколько вам должны заплатить за все переработки за дневные часы <br/>
            Переработки ночь - то, сколько вам должны заплатить за все переработки за ночные  часы <br/>
            Итоговая сумма за переработки - сумма всех доплат за переработки, а именно сложение трех предыдущих значений<br/>
            Итоговая зп - сложение предыдущего параметра + ваш оклад ( данная функция пока что может работать некорректно, поэтому лучше пользуйтесь предыдущим параметром, прибавляя к нему оклад)<br/>
            <h3>Все расчеты выполнены с учетом НДФЛ</h3> */}
        </div>
      )}
    </div>
  );
}

export default App;

function рассчитатьЗарплату(массив1, массив2,    нормаЧасов, оклад) {
  let общаяСумма = 0;
  let суммаПервогоМассива = 0;
  let суммаИзВторогоМассива = 0;
  let суммаИзТретьегоМассива = 0;
  let суммаИзЧетвёртогоМассива = 0;
  let оставшиеЧасыМассив1 = 0;
  let оставшиеЧасыМассив2 = 0;
  let суммаОставшихсяЧасовМассив1 = 0;
  let суммаОставшихсяЧасовМассив2 = 0;
 

  let i = 0;
  let j = 0;
 
  while (i < массив1.length || j < массив2.length) {
    if (i < массив1.length) {
      общаяСумма += массив1[i];
      суммаПервогоМассива += массив1[i];
      оставшиеЧасыМассив1 += массив1[i];
      i++;
    }

    if (общаяСумма >= нормаЧасов) {
    }

    if (j < массив2.length) {
      общаяСумма += массив2[j];
      суммаИзВторогоМассива += массив2[j];
      оставшиеЧасыМассив2 += массив2[j];
      j++;
    }

    if (общаяСумма >= нормаЧасов) {
      break;
    }
  }

  // Рассчитываем суммы оставшихся часов после набора нормы
  суммаОставшихсяЧасовМассив1 = массив1.slice(i).reduce((acc, curr) => acc + curr, 0);
  суммаОставшихсяЧасовМассив2 = массив2.slice(j).reduce((acc, curr) => acc + curr, 0);


  const итого = массив1.concat(массив2).reduce((acc, curr) => acc + curr, 0);
  const оставшаяСумма = Math.max(0, общаяСумма - нормаЧасов);
  const количествоПереработок = оставшаяСумма;

  const ценаЧаса = оклад / нормаЧасов;
  const ценаЧасаПереработки = ценаЧаса * 1.5; // Пусть переработка оплачивается с коэффициентом 1.5

  return {
    общаяСумма,
    суммаПервогоМассива,
    суммаИзВторогоМассива,
    суммаИзТретьегоМассива,
    суммаИзЧетвёртогоМассива,
    оставшаяСумма,
    количествоПереработок,
    итого,
    ценаЧаса,
    ценаЧасаПереработки,
    оставшиеЧасыМассив1,
    оставшиеЧасыМассив2,
    суммаОставшихсяЧасовМассив1,
    суммаОставшихсяЧасовМассив2
  };
}
