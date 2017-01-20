import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";

import {TopMenuService} from "./top-menu.service";

@Injectable()
export class TopMenuServiceMock extends TopMenuService {

    getTables(){
        return Observable.from(this.mockResult).map(res => JSON.parse(res));
    }

    mockResult: [string] = [
`{"rowSet":[["0","System","FV_SYSTEM","T","2017-01-11T17:05:38.712",{\"i\":[\"ID\",\"NAME\",\"CODE\",\"MODE\",\"FLAG\",\"LGND\",\"IS_ARCH_SUPPORT\",\"M_CHANGE_ID\",\"M_DATE\"],\"t\":[\"INTEGER\",\"STRING\",\"STRING\",\"STRING\",\"STRING\",\"STRING\",\"STRING\",\"INTEGER\",\"DATE\"],\"d\":[false,false,false,false,false,false,false,false,false]},"Y","2","2017-01-11T17:05:38.837"],
			["1","DParams","FV_D_PARAMS","R","2017-01-11T17:06:12.337",{\"i\":[\"PMID\",\"PTID\",\"NAME\",\"TPCD\",\"PVAL\",\"M_CHANGE_ID\",\"M_DATE\"],\"t\":[\"INTEGER\",\"INTEGER\",\"STRING\",\"STRING\",\"STRING\",\"INTEGER\",\"DATE\"],\"d\":[false,false,false,false,false,false,false]},"N","4","2017-01-11T17:06:12.337"],
			["2","SysStat","FV_STAT","R","2017-01-11T17:06:12.337",{\"i\":[\"ID\",\"Category\",\"Code\",\"Name\",\"Value\",\"Info\",\"Date\",\"M_CHANGE_ID\",\"M_DATE\"],\"t\":[\"INTEGER\",\"STRING\",\"STRING\",\"STRING\",\"STRING\",\"STRING\",\"DATE\",\"INTEGER\",\"DATE\"],\"d\":[false,false,false,false,false,false,false,false,false]},"N","6","2017-01-11T17:06:12.337"],
			["3","Priority groups","FV_D_PRIORITY_GROUP","T","2017-01-11T17:06:12.337",{\"i\":[\"ID\",\"Code\",\"Name\",\"Queueable\",\"ExtCd\",\"M_CHANGE_ID\",\"M_DATE\"],\"t\":[\"INTEGER\",\"STRING\",\"STRING\",\"STRING\",\"STRING\",\"INTEGER\",\"DATE\"],\"d\":[false,false,false,false,false,false,false]},"N","8","2017-01-11T17:06:12.337"],
			["4","Priorities","FV_D_PRIORITY","T","2017-01-11T17:06:12.337",{\"i\":[\"ID\",\"PriorityGroupId\",\"PriorityGroupCode\",\"Value\",\"M_CHANGE_ID\",\"M_DATE\"],\"t\":[\"INTEGER\",\"INTEGER\",\"STRING\",\"INTEGER\",\"INTEGER\",\"DATE\"],\"d\":[false,false,false,false,false,false]},"N","10","2017-01-11T17:06:12.337"],
			["5","Currencies","FV_CURS","T","2017-01-11T17:06:12.337",{\"i\":[\"ID\",\"Code\",\"Name\",\"AlterCode\",\"SwiftDecimals\",\"M_CHANGE_ID\",\"M_DATE\"],\"t\":[\"INTEGER\",\"STRING\",\"STRING\",\"STRING\",\"INTEGER\",\"INTEGER\",\"DATE\"],\"d\":[false,false,false,false,false,false,false]},"N","12","2017-01-11T17:06:12.337"],
			["6","Countries","FV_P_COUNTRIES","T","2017-01-11T17:06:12.337",{\"i\":[\"ID\",\"Code\",\"Name\",\"M_CHANGE_ID\",\"M_DATE\"],\"t\":[\"INTEGER\",\"STRING\",\"STRING\",\"INTEGER\",\"DATE\"],\"d\":[false,false,false,false,false]},"N","14","2017-01-11T17:06:12.337"],
			["7","Cities","FV_P_CITY","T","2017-01-11T17:06:12.337",{\"i\":[\"ID\",\"Code\",\"Name\",\"CCode\",\"M_CHANGE_ID\",\"M_DATE\"],\"t\":[\"INTEGER\",\"STRING\",\"STRING\",\"STRING\",\"INTEGER\",\"DATE\"],\"d\":[false,false,false,false,false,false]},"N","16","2017-01-11T17:06:12.337"],
			["8","Rate types","FV_RTYPES","T","2017-01-11T17:06:12.337",{\"i\":[\"ID\",\"Code\",\"Name\",\"TermCd\",\"ParentRt\",\"CalcAlg\",\"M_CHANGE_ID\",\"M_DATE\"],\"t\":[\"INTEGER\",\"STRING\",\"STRING\",\"STRING\",\"STRING\",\"STRING\",\"INTEGER\",\"DATE\"],\"d\":[false,false,false,false,false,false,false,false]},"N","18","2017-01-11T17:06:12.337"],
			["9","Terms","FV_TERMS","T","2017-01-11T17:06:12.337",{\"i\":[\"ID\",\"Code\",\"Name\",\"Days\",\"Weeks\",\"Months\",\"Years\",\"TUniCode\",\"M_CHANGE_ID\",\"M_DATE\"],\"t\":[\"INTEGER\",\"STRING\",\"STRING\",\"INTEGER\",\"INTEGER\",\"INTEGER\",\"INTEGER\",\"STRING\",\"INTEGER\",\"DATE\"],\"d\":[false,false,false,false,false,false,false,false,false,false]},"N","20","2017-01-11T17:06:12.337"],
			["10","Common dictionary","FV_CDICT","T","2017-01-11T17:06:12.337",{\"i\":[\"ID\",\"Lang\",\"Table\",\"Field\",\"Value\",\"Text\",\"M_CHANGE_ID\",\"M_DATE\"],\"t\":[\"INTEGER\",\"STRING\",\"STRING\",\"STRING\",\"STRING\",\"STRING\",\"INTEGER\",\"DATE\"],\"d\":[false,false,false,false,false,false,false,false]},"N","22","2017-01-11T17:06:12.337"]			
		]	
    }`];
}